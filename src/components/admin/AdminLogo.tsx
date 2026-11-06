import { LogoAF } from '../LogoAF'

/** Logo de l'écran de connexion du BO (logo provisoire, voir LogoAF). */
export function AdminLogo() {
  return (
    <span className="graphic-logo afk-logo">
      <LogoAF scale={1.1} />
    </span>
  )
}

export default AdminLogo
