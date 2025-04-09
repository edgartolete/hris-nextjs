import { useLanguage } from "./langStore";

export function Component6() {
  const language = useLanguage()
  
  return (
    <div>
      <h2>language: {language}</h2>
    </div>
  );
}
