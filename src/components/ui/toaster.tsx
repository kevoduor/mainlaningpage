
import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"

interface ToasterProps {
  position?: "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right"
}

export function Toaster({ position = "top-right" }: ToasterProps) {
  const { toasts } = useToast()

  // Change the className based on position
  const getViewportClassNames = () => {
    switch (position) {
      case "top-left":
        return "fixed top-0 left-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-auto sm:left-0 sm:top-0 sm:flex-col md:max-w-[420px]"
      case "top-center":
        return "fixed top-0 left-1/2 -translate-x-1/2 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-auto sm:top-0 sm:flex-col md:max-w-[420px]"
      case "top-right":
        return "fixed top-0 right-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-auto sm:right-0 sm:top-0 sm:flex-col md:max-w-[420px]"
      case "bottom-left":
        return "fixed bottom-0 left-0 z-[100] flex max-h-screen w-full flex-col p-4 sm:bottom-0 sm:left-0 sm:top-auto sm:flex-col md:max-w-[420px]"
      case "bottom-center":
        return "fixed bottom-0 left-1/2 -translate-x-1/2 z-[100] flex max-h-screen w-full flex-col p-4 sm:bottom-0 sm:top-auto sm:flex-col md:max-w-[420px]"
      case "bottom-right":
        return "fixed bottom-0 right-0 z-[100] flex max-h-screen w-full flex-col p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]"
      default:
        return "fixed top-0 right-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-auto sm:right-0 sm:top-0 sm:flex-col md:max-w-[420px]"
    }
  }

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport className={getViewportClassNames()} />
    </ToastProvider>
  )
}
