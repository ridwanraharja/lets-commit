import { useTheme } from "../hooks/useTheme";

export default function Footer() {
  const { theme } = useTheme();
  return (
    <>
      <div
        className={`p-6 text-text text-[0.75rem] font-light font-body bg-body ${
          theme ? " dark:bg-body-dark dark:text-body" : " "
        } text-center font-title`}
      >
        <h1>Copyright &copy; 2025 Let'sCommit! Website. All Right Reserved.</h1>
      </div>
    </>
  );
}
