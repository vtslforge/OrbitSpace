import useCurrentUser from "../hooks/useCurrentUser";

const Header = ({ onSignOut }: { onSignOut: () => void }) => {
  const username = useCurrentUser();
  return (
    <header className="page-header">
      <div>
        <h1 className="page-title">Good to see you{username ? `, ${username}` : ""}</h1>
        <p className="page-subtitle">A clear view of what you are working on.</p>
      </div>
      <button className="quiet-button" onClick={onSignOut} type="button">Sign out</button>
    </header>
  );
};

export default Header;
