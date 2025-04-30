import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, CreditCard, Shield } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "Checkout | Ighota",
  description: "Complete your subscription purchase",
}

// Mock data - would come from API in real implementation
const plans = {
  basic: {
    name: "Basic Plan",
    price: "$9.99",
    description: "Monthly subscription",
  },
  premium: {
    name: "Premium Plan",
    price: "$19.99",
    description: "Monthly subscription",
  },
  ultimate: {
    name: "Ultimate Plan",
    price: "$29.99",
    description: "Monthly subscription",
  },
}

export default function CheckoutPage({ params }: { params: { planId: string } }) {
  const plan = plans[params.planId as keyof typeof plans]

  if (!plan) {
    notFound()
  }

  return (
    <div className="container max-w-4xl py-10">
      <Link
        href="/subscription"
        className="mb-8 inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to plans
      </Link>

      <div className="grid gap-10 md:grid-cols-5">
        <div className="md:col-span-3">
          <div>
            <h1 className="text-2xl font-bold sm:text-3xl">Checkout</h1>
            <p className="mt-1 text-muted-foreground">Complete your subscription purchase</p>
          </div>

          <Separator className="my-6" />

          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Contact Information</h2>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="your.email@example.com" />
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Payment Method</h2>
              <RadioGroup defaultValue="card" className="grid gap-4">
                <div>
                  <RadioGroupItem value="card" id="card" className="peer sr-only" />
                  <Label
                    htmlFor="card"
                    className="flex cursor-pointer items-center justify-between rounded-md border border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      <div className="grid gap-1">
                        <p className="text-sm font-medium leading-none">Card</p>
                        <p className="text-xs text-muted-foreground">Pay with credit or debit card</p>
                      </div>
                    </div>
                  </Label>
                </div>
              </RadioGroup>

              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name on card</Label>
                  <Input id="name" placeholder="John Doe" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="number">Card number</Label>
                  <Input id="number" placeholder="1234 5678 9012 3456" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="expiry">Expiry date</Label>
                    <Input id="expiry" placeholder="MM/YY" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="cvc">CVC</Label>
                    <Input id="cvc" placeholder="123" />
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Billing Address</h2>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" placeholder="123 Main St" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="City" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="state">State</Label>
                    <Input id="state" placeholder="State" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="zip">ZIP</Label>
                    <Input id="zip" placeholder="ZIP" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
              <CardDescription>Review your order details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="font-medium">{plan.name}</span>
                <span>{plan.price}</span>
              </div>
              <div className="text-sm text-muted-foreground">{plan.description}</div>
              <Separator />
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>{plan.price}</span>
              </div>
              <div className="flex items-center gap-2 rounded-md bg-muted p-3 text-xs">
                <Shield className="h-4 w-4" />
                <p>Your payment information is secure and encrypted</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" size="lg">
                Complete Purchase
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
