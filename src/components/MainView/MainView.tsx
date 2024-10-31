import GetStartedDisclaimer from '@/components/MainView/components/GetStarted.tsx'

const MainView = () => {
  return (
    <div className="p-4">
      <div>
        <p>
          This tool is created to guide you with your crypto tax declaration
        </p>
        <p className="mb-4">
          You can simply upload an exported CSV file from your exchange and it
          will be processed locally in your browser.
          <br />
          <strong>No data is sent anywhere</strong>
        </p>
        <GetStartedDisclaimer />
      </div>
    </div>
  )
}

export default MainView
