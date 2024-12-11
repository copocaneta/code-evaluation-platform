import { Select } from '@chakra-ui/react';

const languages = [
  { id: 'python', name: 'Python' },
  { id: 'javascript', name: 'JavaScript' },
  { id: 'typescript', name: 'TypeScript' },
  { id: 'java', name: 'Java' },
];

interface LanguageSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const LanguageSelector = ({ value, onChange }: LanguageSelectorProps) => {
  return (
    <Select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      width="200px"
      size="sm"
      defaultValue={'python'}
    >
      {languages.map((lang) => (
        <option key={lang.id} value={lang.id}>
          {lang.name}
        </option>
      ))}
    </Select>
  );
};

export default LanguageSelector; 