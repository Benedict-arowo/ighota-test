import type { Metadata } from "next"
import Link from "next/link"
import { Check, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"

export const metadata: Metadata = {
  title: "Subscription Plans | Ighota",
  description: "Choose the right subscription plan for your educational journey",
}

interface PlanFeature {
  text: string
  included: boolean
}

interface SubscriptionPlan {
  id: string
  name: string
  description: string
  price: string | null
  priceDescription: string
  features: PlanFeature[]
  popular?: boolean
  buttonText: string
  buttonVariant: "default" | "outline" | "secondary"
  recommended?: boolean
}

const plans: SubscriptionPlan[] = [
  {
    id: "free",
    name: "Free",
    description: "Basic access to get started",
    price: null,
    priceDescription: "forever",
    buttonText: "Current Plan",
    buttonVariant: "secondary",
    features: [
      { text: "Access to 5 free courses", included: true },
      { text: "Basic quizzes", included: true },
      { text: "Limited course materials", included: true },
      { text: "Basic progress tracking", included: true },
      { text: "Community forum access", included: true },
      { text: "Live tutoring sessions", included: false },
      { text: "Advanced practice exercises", included: false },
      { text: "Personalized study plans", included: false },
      { text: "Downloadable resources", included: false },
      { text: "Certificate of completion", included: false },
    ],
  },
  {
    id: "basic",
    name: "Basic",
    description: "Essential learning tools for beginners",
    price: "₦3,999",
    priceDescription: "per month",
    buttonText: "Get Started",
    buttonVariant: "outline",
    features: [
      { text: "Access to 20 courses", included: true },
      { text: "Basic quizzes and assessments", included: true },
      { text: "Course notes and materials", included: true },
      { text: "Progress tracking", included: true },
      { text: "Community forum access", included: true },
      { text: "Live tutoring sessions", included: false },
      { text: "Advanced practice exercises", included: false },
      { text: "Personalized study plans", included: false },
      { text: "Downloadable resources", included: false },
      { text: "Certificate of completion", included: false },
    ],
  },
  {
    id: "premium",
    name: "Premium",
    description: "Comprehensive learning experience",
    price: "₦7,999",
    priceDescription: "per month",
    buttonText: "Get Premium",
    buttonVariant: "default",
    popular: true,
    recommended: true,
    features: [
      { text: "Access to all courses", included: true },
      { text: "Advanced quizzes and assessments", included: true },
      { text: "Course notes and materials", included: true },
      { text: "Detailed progress tracking", included: true },
      { text: "Community forum access", included: true },
      { text: "2 hours of live tutoring per month", included: true },
      { text: "Advanced practice exercises", included: true },
      { text: "Personalized study plans", included: true },
      { text: "Downloadable resources", included: false },
      { text: "Certificate of completion", included: false },
    ],
  },
  {
    id: "ultimate",
    name: "Ultimate",
    description: "Complete educational solution",
    price: "₦11,999",
    priceDescription: "per month",
    buttonText: "Get Ultimate",
    buttonVariant: "outline",
    features: [
      { text: "Unlimited course access", included: true },
      { text: "All quizzes and assessments", included: true },
      { text: "Premium course notes and materials", included: true },
      { text: "Advanced analytics and reporting", included: true },
      { text: "Priority community support", included: true },
      { text: "5 hours of live tutoring per month", included: true },
      { text: "Unlimited practice exercises", included: true },
      { text: "AI-powered study recommendations", included: true },
      { text: "Downloadable resources", included: true },
      { text: "Official certificates of completion", included: true },
    ],
  },
]

export default function SubscriptionPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="container py-10">
          <div className="mx-auto max-w-[58rem] text-center">
            <h1 className="text-3xl font-bold sm:text-4xl">Choose Your Plan</h1>
            <p className="mt-2 text-muted-foreground">
              Select the plan that best fits your educational needs. Upgrade or downgrade at any time.
            </p>

            <div className="mt-4 flex justify-center gap-4">
              <div className="inline-flex items-center rounded-md border p-1">
                <button className="inline-flex items-center justify-center rounded-sm px-3 py-1.5 text-sm font-medium bg-primary text-primary-foreground shadow-sm">
                  ₦ NGN
                </button>
                <button className="inline-flex items-center justify-center rounded-sm px-3 py-1.5 text-sm font-medium">
                  $ USD
                </button>
              </div>
              <div className="inline-flex items-center rounded-md border p-1">
                <button className="inline-flex items-center justify-center rounded-sm px-3 py-1.5 text-sm font-medium bg-primary text-primary-foreground shadow-sm">
                  Monthly
                </button>
                <button className="inline-flex items-center justify-center rounded-sm px-3 py-1.5 text-sm font-medium">
                  Yearly (Save 20%)
                </button>
              </div>
            </div>
          </div>

          <div className="grid gap-6 mt-8 md:grid-cols-2 lg:grid-cols-4">
            {plans.map((plan) => (
              <Card
                key={plan.id}
                className={cn(
                  "flex flex-col",
                  plan.popular && "border-primary shadow-md",
                  plan.recommended && "border-primary shadow-md",
                )}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-0 right-0 mx-auto w-fit rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                    Most Popular
                  </div>
                )}
                {plan.recommended && !plan.popular && (
                  <div className="absolute -top-3 left-0 right-0 mx-auto w-fit rounded-full bg-yellow-500 px-3 py-1 text-xs font-medium text-black">
                    Recommended
                  </div>
                )}
                <CardHeader className="flex flex-col space-y-1">
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="grid flex-1 place-items-start gap-6">
                  <div className="flex items-baseline text-left">
                    {plan.price ? (
                      <>
                        <span className="text-3xl font-bold">{plan.price}</span>
                        <span className="ml-1 text-sm text-muted-foreground">{plan.priceDescription}</span>
                      </>
                    ) : (
                      <span className="text-3xl font-bold">Free</span>
                    )}
                  </div>
                  <div className="grid gap-3 text-sm">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        {feature.included ? (
                          <Check className="h-4 w-4 text-primary" />
                        ) : (
                          <X className="h-4 w-4 text-muted-foreground opacity-50" />
                        )}
                        <span className={cn("text-sm", !feature.included && "text-muted-foreground")}>
                          {feature.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Link
                    href={plan.id === "free" ? "#" : `/subscription/checkout/${plan.id}`}
                    className={cn(
                      buttonVariants({
                        variant: plan.buttonVariant,
                        size: "lg",
                      }),
                      "w-full",
                      plan.id === "free" && "pointer-events-none",
                    )}
                  >
                    {plan.buttonText}
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mx-auto mt-12 max-w-[58rem]">
            <h2 className="text-xl font-bold text-center mb-6">Compare Plans</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="py-4 px-4 text-left">Feature</th>
                    {plans.map((plan) => (
                      <th key={plan.id} className="py-4 px-4 text-center">
                        {plan.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-4 px-4 font-medium">Course Access</td>
                    <td className="py-4 px-4 text-center">5 courses</td>
                    <td className="py-4 px-4 text-center">20 courses</td>
                    <td className="py-4 px-4 text-center">All courses</td>
                    <td className="py-4 px-4 text-center">Unlimited</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 px-4 font-medium">Quizzes & Assessments</td>
                    <td className="py-4 px-4 text-center">Basic</td>
                    <td className="py-4 px-4 text-center">Standard</td>
                    <td className="py-4 px-4 text-center">Advanced</td>
                    <td className="py-4 px-4 text-center">Premium</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 px-4 font-medium">Live Tutoring</td>
                    <td className="py-4 px-4 text-center">
                      <X className="h-4 w-4 mx-auto text-muted-foreground" />
                    </td>
                    <td className="py-4 px-4 text-center">
                      <X className="h-4 w-4 mx-auto text-muted-foreground" />
                    </td>
                    <td className="py-4 px-4 text-center">2 hours/month</td>
                    <td className="py-4 px-4 text-center">5 hours/month</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 px-4 font-medium">Study Plans</td>
                    <td className="py-4 px-4 text-center">
                      <X className="h-4 w-4 mx-auto text-muted-foreground" />
                    </td>
                    <td className="py-4 px-4 text-center">
                      <X className="h-4 w-4 mx-auto text-muted-foreground" />
                    </td>
                    <td className="py-4 px-4 text-center">
                      <Check className="h-4 w-4 mx-auto text-primary" />
                    </td>
                    <td className="py-4 px-4 text-center">AI-powered</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 font-medium">Certificates</td>
                    <td className="py-4 px-4 text-center">
                      <X className="h-4 w-4 mx-auto text-muted-foreground" />
                    </td>
                    <td className="py-4 px-4 text-center">
                      <X className="h-4 w-4 mx-auto text-muted-foreground" />
                    </td>
                    <td className="py-4 px-4 text-center">
                      <X className="h-4 w-4 mx-auto text-muted-foreground" />
                    </td>
                    <td className="py-4 px-4 text-center">
                      <Check className="h-4 w-4 mx-auto text-primary" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mx-auto mt-12 max-w-[58rem] text-center">
            <h2 className="text-xl font-bold">Frequently Asked Questions</h2>
            <div className="mt-6 grid gap-6 text-left md:grid-cols-2">
              <div>
                <h3 className="font-medium">Can I switch plans later?</h3>
                <p className="text-sm text-muted-foreground">
                  Yes, you can upgrade or downgrade your plan at any time. Changes will be applied to your next billing
                  cycle.
                </p>
              </div>
              <div>
                <h3 className="font-medium">Is there a student discount?</h3>
                <p className="text-sm text-muted-foreground">
                  Yes, we offer a 20% discount for verified students. Contact our support team with your student ID for
                  verification.
                </p>
              </div>
              <div>
                <h3 className="font-medium">Do you offer refunds?</h3>
                <p className="text-sm text-muted-foreground">
                  We offer a 7-day money-back guarantee if you're not satisfied with your subscription.
                </p>
              </div>
              <div>
                <h3 className="font-medium">How do I cancel my subscription?</h3>
                <p className="text-sm text-muted-foreground">
                  You can cancel your subscription at any time from your account settings. Your access will continue
                  until the end of your current billing period.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="w-full border-t bg-background py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © {new Date().getFullYear()} Ighota. All rights reserved.
          </p>
          <nav className="flex gap-4">
            <Link href="/terms" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Privacy
            </Link>
            <Link href="/contact" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Contact
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
