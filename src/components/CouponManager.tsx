
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { Tag, Percent, Calendar, Gift } from 'lucide-react';

interface Coupon {
  id: string;
  code: string;
  description: string;
  discount: number;
  type: 'percentage' | 'fixed';
  expiryDate: string;
  minAmount?: number;
  isActive: boolean;
}

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

  // Sample coupons - in real app, fetch from API
  const availableCoupons: Coupon[] = [
    {
      id: '1',
      code: 'ORGANIC10',
      description: 'Get 10% off on all organic products',
      discount: 10,
      type: 'percentage',
      expiryDate: '2024-12-31',
      minAmount: 500,
      isActive: true
    },
    {
      id: '2',
      code: 'SEEDS20',
      description: 'Flat ₹20 off on seed purchases',
      discount: 20,
      type: 'fixed',
      expiryDate: '2024-08-31',
      minAmount: 200,
      isActive: true
    },
    {
      id: '3',
      code: 'NEWUSER15',
      description: '15% off for new customers',
      discount: 15,
      type: 'percentage',
      expiryDate: '2024-09-30',
      isActive: true
    }
  ];

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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const coupon = availableCoupons.find(
        c => c.code.toLowerCase() === codeToApply.toLowerCase() && c.isActive
      );

      if (coupon) {
        onApplyCoupon?.(coupon.code, coupon.discount);
        toast({
          title: "Coupon Applied!",
          description: `${coupon.description}`,
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

  const formatDiscount = (coupon: Coupon) => {
    return coupon.type === 'percentage' 
      ? `${coupon.discount}% OFF` 
      : `₹${coupon.discount} OFF`;
  };

  const formatExpiryDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

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
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Percent className="mr-2 h-5 w-5" />
            Available Coupons
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {availableCoupons.map((coupon) => (
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
                      {coupon.description}
                    </p>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3 mr-1" />
                      Expires: {formatExpiryDate(coupon.expiryDate)}
                      {coupon.minAmount && (
                        <span className="ml-3">
                          Min. order: ₹{coupon.minAmount}
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
    </div>
  );
};

export default CouponManager;
