import { Cpu, FileText, ShieldCheck } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import GetStartedDisclaimer from '@/components/MainView/components/GetStarted.tsx'
import CardInfo from '@/components/MainView/components/CardInfo.tsx'

const MainView = () => {
  const { t } = useTranslation()

  const stepsHowItWorks = t('main.howItWorks.steps', {
    returnObjects: true,
  }) as string[]

  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center px-4 py-12 text-center">
      <h1 className="mb-6 text-4xl font-bold">{t('main.title')}</h1>

      <p className="mb-12 text-xl">{t('main.description')}</p>

      <div className="mb-12 grid gap-8 text-left md:grid-cols-3">
        <CardInfo
          title={t('main.cardPrivate.title')}
          description={t('main.cardPrivate.description')}
          icon={<ShieldCheck />}
        />

        <CardInfo
          title={t('main.cardSimple.title')}
          description={t('main.cardSimple.description')}
          icon={<Cpu />}
        />

        <CardInfo
          title={t('main.cardTaxReady.title')}
          description={t('main.cardTaxReady.description')}
          icon={<FileText />}
        />
      </div>
      <div className="mb-12 max-w-2xl rounded-lg bg-blue-50 p-6 dark:bg-blue-900/20">
        <h2 className="mb-4 text-lg font-semibold">
          {t('main.howItWorks.title')}
        </h2>
        <ol className="space-y-3 text-left">
          {stepsHowItWorks.map((step, index) => (
            <li className="flex items-start" key={step}>
              <span className="mr-2 font-bold">{index + 1}.</span>
              {step}
            </li>
          ))}
        </ol>
      </div>
      <GetStartedDisclaimer />
      <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
        {t('main.footer.claimSupported')}
      </p>
    </div>
  )
}

export default MainView
