import { Component } from 'solid-js';
import { Toggle } from '../components/lib/Toggle';
import { appSettingsService } from '../services/appSettingsService';
import { KeysMatching } from '../utils/types';

const SettingsPage: Component = () => {
  return (
    <div class="p-4">
      <h1 class="mb-4 text-6xl font-thin">הגדרות</h1>
      {/* <div>
        <h3 class="mb-4 text-3xl">עיצוב</h3>
        <SettingsToggle checked={false} label="מצב לילה" onChange={() => {}} />
      </div> */}
      <div>
        <h3 class="mb-4 text-3xl">למידה</h3>
        <SettingsKeyToggle
          key="skipPastQuestions"
          label="הימנע מחזרה על שאלות המסומנות כידועות"
        />
        <SettingsKeyToggle
          key="waitForCorrectTwice"
          label="חכה להצלחה פעמיים לפני סימון שאלה שנכשלה כידועה"
        />
      </div>
    </div>
  );
};

const SettingsKeyToggle: Component<{
  key: KeysMatching<typeof appSettingsService.settings.value, boolean>;
  label: string;
}> = (props) => {
  return (
    <SettingsToggle
      label={props.label}
      checked={appSettingsService.settings.value[props.key]}
      onChange={(checked) => {
        appSettingsService.settings.set((s) => {
          s[props.key] = checked;
          return s;
        });
      }}
    />
  );
};

const SettingsToggle: Component<{
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}> = (props) => {
  return (
    <div class="my-1 flex flex-row items-center justify-between">
      <p>{props.label}</p>
      <Toggle checked={props.checked} onChange={props.onChange} />
    </div>
  );
};

export default SettingsPage;
