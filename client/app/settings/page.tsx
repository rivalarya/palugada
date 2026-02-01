import SettingsFeature from "@/components/features/settings/settings-feature";

export default function SettingsPage() {
  return (
    <main className="h-full flex flex-col p-4 md:p-8">
      <div className="max-w-4xl mx-auto w-full">
        <h1 className="text-3xl font-bold text-center mb-8">
          Settings
        </h1>
        <SettingsFeature />
      </div>
    </main>
  );
}