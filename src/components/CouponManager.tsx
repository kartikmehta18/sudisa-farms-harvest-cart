
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { Tag, Percent, Calendar, Gift } from 'lucide-react';
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

  // Fetch real coupons from WooCommerce API
  const { data: coupons = [], isLoading: couponsLoading } = useQuery({
    queryKey: ['coupons'],
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
      // Find coupon in the fetched list
      const coupon = coupons.find(
        c => c.code.toLowerCase() === codeToApply.toLowerCase() && c.status === 'publish'
      );

      if (coupon) {
        // Apply coupon via API
        await api.applyCoupon(coupon.code);
        
        const discount = coupon.discount_type === 'percent' 
          ? parseFloat(coupon.amount) 
          : parseFloat(coupon.amount);
        
        onApplyCoupon?.(coupon.code, discount);
        toast({
          title: "Coupon Applied!",
          description: `${coupon.description || `${coupon.amount}${coupon.discount_type === 'percent' ? '%' : '₹'} discount applied`}`,
        });
        setCouponCode('');
      } else {
        toast({
          title: "Invalid Coupon",
          description: "The coupon code is invalid or expired",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error applying coupon:', error);
      toast({
        title: "Error",
        description: "Failed to apply coupon. Please try again.",
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

  if (couponsLoading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Apply Coupon Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Tag className="mr-2 h-5 w-5" />
            Apply Coupon
          </CardTitle>
        </CardHeader>
        <CardContent>
          {appliedCoupon ? (
            <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center">
                <Gift className="h-5 w-5 text-green-600 mr-2" />
                <div>
                  <p className="font-medium text-green-800">Coupon Applied: {appliedCoupon}</p>
                  <p className="text-sm text-green-600">Discount applied to your order</p>
                </div>
              </div>
              <Button onClick={removeCoupon} variant="outline" size="sm">
                Remove
              </Button>
            </div>
          ) : (
            <div className="flex space-x-2">
              <Input
                placeholder="Enter coupon code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                onKeyPress={(e) => e.key === 'Enter' && applyCoupon()}
              />
              <Button 
                onClick={() => applyCoupon()} 
                disabled={isLoading}
                className="organic-gradient"
              >
                {isLoading ? 'Applying...' : 'Apply'}
              </Button>
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
              Available Coupons ({coupons.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {coupons.map((coupon) => (
                <div 
                  key={coupon.id} 
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <Badge className="bg-primary/10 text-primary mr-2">
                          {coupon.code}
                        </Badge>
                        <Badge variant="secondary">
                          {formatDiscount(coupon)}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">
                        {coupon.description || `Get ${formatDiscount(coupon)} on your order`}
                      </p>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3 mr-1" />
                        Expires: {formatExpiryDate(coupon.date_expires)}
                        {coupon.minimum_amount && parseFloat(coupon.minimum_amount) > 0 && (
                          <span className="ml-3">
                            Min. order: ₹{coupon.minimum_amount}
                          </span>
                        )}
                      </div>
                    </div>
                    <Button
                      onClick={() => applyCoupon(coupon.code)}
                      size="sm"
                      variant="outline"
                      className="ml-4"
                      disabled={appliedCoupon === coupon.code}
                    >
                      {appliedCoupon === coupon.code ? 'Applied' : 'Apply'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {coupons.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground">No coupons available at the moment</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CouponManager;
