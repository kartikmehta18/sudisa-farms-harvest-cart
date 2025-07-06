
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { Tag, Percent, Calendar, Gift, AlertCircle } from 'lucide-react';
import { api } from '@/services/api';

interface CouponManagerProps {
  onApplyCoupon?: (couponCode: string, discount: number) => void;
  appliedCoupon?: string;
  onRemoveCoupon?: () => void;
}

const CouponManager: React.FC<CouponManagerProps> = ({ 
  onApplyCoupon, 
  appliedCoupon, 
  onRemoveCoupon 
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Fetch available coupons from WooCommerce API
  const { data: coupons = [], isLoading: couponsLoading, error } = useQuery({
    queryKey: ['available-coupons'],
    queryFn: api.getCoupons,
  });

  const applyCoupon = async (code?: string) => {
    const codeToApply = code || couponCode;
    if (!codeToApply.trim()) {
      toast({
        title: "Error",
        description: "Please enter a coupon code",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Find coupon in the available list
      const coupon = coupons.find(
        c => c.code.toLowerCase() === codeToApply.toLowerCase() && 
             c.status === 'publish'
      );

      if (coupon) {
        // Check if coupon is valid
        const now = new Date();
        const expiryDate = coupon.date_expires ? new Date(coupon.date_expires) : null;
        
        if (expiryDate && expiryDate < now) {
          toast({
            title: "Coupon Expired",
            description: "This coupon has expired and cannot be used",
            variant: "destructive"
          });
          return;
        }

        if (coupon.usage_count >= coupon.usage_limit && coupon.usage_limit > 0) {
          toast({
            title: "Coupon Limit Reached",
            description: "This coupon has reached its usage limit",
            variant: "destructive"
          });
          return;
        }
        
        // Apply coupon via API
        await api.applyCoupon(coupon.code);
        
        const discount = coupon.discount_type === 'percent' 
          ? parseFloat(coupon.amount) 
          : parseFloat(coupon.amount);
        
        onApplyCoupon?.(coupon.code, discount);
        toast({
          title: "Coupon Applied Successfully! 🎉",
          description: `${coupon.description || `${coupon.amount}${coupon.discount_type === 'percent' ? '%' : '₹'} discount applied to your order`}`,
        });
        setCouponCode('');
      } else {
        toast({
          title: "Invalid Coupon Code",
          description: "The coupon code you entered is invalid or not available",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error applying coupon:', error);
      toast({
        title: "Application Failed",
        description: "Failed to apply coupon. Please try again or contact support.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const removeCoupon = () => {
    onRemoveCoupon?.();
    toast({
      title: "Coupon Removed",
      description: "Coupon has been removed from your order",
    });
  };

  const formatDiscount = (coupon: any) => {
    return coupon.discount_type === 'percent' 
      ? `${coupon.amount}% OFF` 
      : `₹${coupon.amount} OFF`;
  };

  const formatExpiryDate = (dateString: string) => {
    if (!dateString) return 'No expiry';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const isExpired = (dateString: string) => {
    if (!dateString) return false;
    return new Date(dateString) < new Date();
  };

  const isUsageLimitReached = (coupon: any) => {
    return coupon.usage_limit > 0 && coupon.usage_count >= coupon.usage_limit;
  };

  if (couponsLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-48 space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <p className="text-muted-foreground">Loading available coupons...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground mb-4">Unable to load coupons</p>
          <Button onClick={() => window.location.reload()} variant="outline" size="sm">
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Apply Coupon Section */}
      <Card className="border-2 border-dashed border-green-200 bg-green-50/50">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center text-green-700">
            <Tag className="mr-2 h-5 w-5" />
            Apply Coupon Code
          </CardTitle>
        </CardHeader>
        <CardContent>
          {appliedCoupon ? (
            <div className="flex items-center justify-between p-4 bg-green-100 border-2 border-green-300 rounded-lg">
              <div className="flex items-center">
                <Gift className="h-5 w-5 text-green-600 mr-3" />
                <div>
                  <p className="font-semibold text-green-800">Coupon Applied: {appliedCoupon}</p>
                  <p className="text-sm text-green-600">Discount has been applied to your order ✅</p>
                </div>
              </div>
              <Button onClick={removeCoupon} variant="outline" size="sm" className="border-green-500 text-green-700 hover:bg-green-100">
                Remove
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  placeholder="Enter coupon code (e.g., SAVE10)"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  onKeyPress={(e) => e.key === 'Enter' && applyCoupon()}
                  className="border-green-300 focus:border-green-500"
                />
                <Button 
                  onClick={() => applyCoupon()} 
                  disabled={isLoading || !couponCode.trim()}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 min-w-[100px]"
                >
                  {isLoading ? 'Applying...' : 'Apply'}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                💡 Enter your coupon code above to get instant discounts on your order
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Available Coupons */}
      {coupons.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Percent className="mr-2 h-5 w-5" />
              Available Coupons ({coupons.filter(c => !isExpired(c.date_expires) && !isUsageLimitReached(c)).length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {coupons.map((coupon) => {
                const expired = isExpired(coupon.date_expires);
                const limitReached = isUsageLimitReached(coupon);
                const unavailable = expired || limitReached;
                
                return (
                  <div 
                    key={coupon.id} 
                    className={`border rounded-lg p-4 transition-all ${
                      unavailable 
                        ? 'opacity-50 bg-gray-50 border-gray-200' 
                        : 'hover:shadow-md border-green-200 bg-gradient-to-r from-green-50 to-emerald-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-3">
                          <Badge className="bg-green-100 text-green-800 mr-3 px-3 py-1 font-mono text-sm">
                            {coupon.code}
                          </Badge>
                          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                            {formatDiscount(coupon)}
                          </Badge>
                          {expired && (
                            <Badge variant="destructive" className="ml-2">
                              Expired
                            </Badge>
                          )}
                          {limitReached && (
                            <Badge variant="destructive" className="ml-2">
                              Limit Reached
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-700 mb-2 font-medium">
                          {coupon.description || `Get ${formatDiscount(coupon)} on your order`}
                        </p>
                        <div className="flex items-center text-xs text-muted-foreground space-x-4">
                          <div className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            Expires: {formatExpiryDate(coupon.date_expires)}
                          </div>
                          {coupon.minimum_amount && parseFloat(coupon.minimum_amount) > 0 && (
                            <span>Min. order: ₹{coupon.minimum_amount}</span>
                          )}
                          {coupon.usage_limit > 0 && (
                            <span>
                              Uses: {coupon.usage_count}/{coupon.usage_limit}
                            </span>
                          )}
                        </div>
                      </div>
                      <Button
                        onClick={() => applyCoupon(coupon.code)}
                        size="sm"
                        variant={appliedCoupon === coupon.code ? "secondary" : "outline"}
                        className={`ml-4 min-w-[80px] ${
                          unavailable 
                            ? 'opacity-50 cursor-not-allowed' 
                            : 'border-green-500 text-green-700 hover:bg-green-100'
                        }`}
                        disabled={appliedCoupon === coupon.code || unavailable}
                      >
                        {appliedCoupon === coupon.code ? 'Applied' : 'Apply'}
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {coupons.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Tag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Coupons Available</h3>
            <p className="text-muted-foreground">Check back later for exciting discount offers!</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CouponManager;
