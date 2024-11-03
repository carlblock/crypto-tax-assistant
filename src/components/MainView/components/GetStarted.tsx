import { useTranslation } from 'react-i18next'
import { ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button.tsx'
import { useMediaQuery } from '@/hooks/UseMediaQuery.tsx'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/Dialog.tsx'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/Drawer.tsx'
import { ROUTES } from '@/constants/routes.ts'

const GetStartedDisclaimerContent = ({
  onClickAccept,
}: {
  onClickAccept: () => void
}) => {
  const { t } = useTranslation()

  const points = t('getStartedDisclaimer.points', {
    returnObjects: true,
  }) as string[]

  return (
    <div className="-mb-2 text-left text-sm text-slate-500 dark:text-slate-400">
      <p>{t('getStartedDisclaimer.description')}</p>
      <p className="mb-2 mt-4 font-bold">
        {t('getStartedDisclaimer.pointsTitle')}
      </p>
      <ul className="list-disc px-3">
        {points.map((point: string) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
      <div className="flex justify-end">
        <Button
          className="mt-4 w-full"
          variant="default"
          size="lg"
          type="button"
          onClick={onClickAccept}
          data-testid="GetStartedDisclaimerContent:button_accept"
        >
          {t('getStartedDisclaimer.cta')} <ArrowRight />
        </Button>
      </div>
    </div>
  )
}

const GetStartedDisclaimer = () => {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const navigate = useNavigate()

  const onClickAccept = () => {
    setOpen(false)
    // Delay a bit to animate the modal / sheet to close
    setTimeout(() => {
      localStorage.setItem('ToSAccepted', 'true')
      navigate(ROUTES.Assistant)
    }, 500)
  }

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="default"
            data-testid="GetStartedDisclaimer:button_cta"
          >
            Get started
            <ArrowRight />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{t('getStartedDisclaimer.title')}</DialogTitle>
            <GetStartedDisclaimerContent onClickAccept={onClickAccept} />
          </DialogHeader>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="default" data-testid="GetStartedDisclaimer:button_cta">
          Get Started <ArrowRight />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{t('getStartedDisclaimer.title')}</DrawerTitle>
          <GetStartedDisclaimerContent onClickAccept={onClickAccept} />
        </DrawerHeader>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button
              variant="outline"
              data-testid="GetStartedDisclaimer:button_cancel"
            >
              {t('cta.cancel')}
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
export default GetStartedDisclaimer
