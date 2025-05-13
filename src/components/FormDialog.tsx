'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { XMarkIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { cn } from '@/lib/utils'

export interface FormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: string
  children: React.ReactNode
  className?: string
  showClose?: boolean
  onSubmit?: () => void | Promise<void>
  loading?: boolean
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl'
  onCancel?: () => void
  showFooter?: boolean
}

const maxWidthClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '3xl': 'max-w-3xl',
  '4xl': 'max-w-4xl',
  '5xl': 'max-w-5xl',
  '6xl': 'max-w-6xl',
  '7xl': 'max-w-7xl',
}

export function FormDialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  className,
  showClose = true,
  maxWidth = '3xl',
  onCancel,
  showFooter = true,
  loading = false,
}: FormDialogProps) {
  const handleOpenChange = (newOpen: boolean) => {
    if (newOpen === false && onCancel) {
      onCancel()
    } else if (newOpen === false) {
      onOpenChange(false)
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" 
        />
        <Dialog.Content 
          className={cn(
            "fixed left-[50%] top-[50%] z-50 flex w-[95vw] translate-x-[-50%] translate-y-[-50%] flex-col border border-primary bg-white shadow-lg duration-200",
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
            "data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]",
            "data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
            "rounded-lg",
            maxWidthClasses[maxWidth],
            className
          )}
          dir="rtl"
          onPointerDownOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
        >
          <div className="flex-1 p-6">
            <div className="flex items-start justify-between">
              <div>
                <Dialog.Title className="text-lg font-semibold text-gray-700">
                  {title}
                </Dialog.Title>
                {description && (
                  <Dialog.Description className="mt-2 text-sm text-gray-500">
                    {description}
                  </Dialog.Description>
                )}
              </div>
              {showClose && (
                <Dialog.Close 
                  className="rounded-sm opacity-70 text-iconPrimary-100 border border-primary  ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground text-iconPrimary"
                  onClick={onCancel}
                >
                  <XMarkIcon className="h-5 w-5" />
                  <span className="sr-only">بستن</span>
                </Dialog.Close>
              )}
            </div>
            <div className="mt-4 max-h-[calc(80vh-8rem)] p-6 overflow-y-auto">
              {children}
            </div>
          </div>
          {showFooter && (
            <div className="flex items-center justify-end gap-3 border-t px-6 py-4 text-iconPrimary-100 bg-iconSecondry-50">
              <button
                type="button"
                onClick={onCancel}
                className="inline-flex justify-center rounded-md bg-white px-4 py-2 text-iconPrimary-100 text-sm font-medium text-iconPrimary shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-iconPrimary focus:ring-offset-2 border border-white"
              >
                انصراف
              </button>
              <FormSubmitButton loading={loading} type="submit"  form="dialogForm">
                ذخیره
              </FormSubmitButton>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export function FormSubmitButton({
  loading,
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { loading?: boolean }) {
  return (
    <button
      className={cn(
        "inline-flex justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-iconPrimary shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-iconPrimary focus:ring-offset-2 border border-white",
        loading && "opacity-50 cursor-not-allowed",
        className
      )}
      disabled={loading}
      {...props}
    >
      {loading ? (
        <>
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-iconPrimary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          در حال ارسال...
        </>
      ) : (
        children
      )}
    </button>
  )
} 