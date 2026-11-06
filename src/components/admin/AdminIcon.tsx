/**
 * Remplace le cube par défaut de Payload (fil d'Ariane, navigation repliée)
 * par le pavé rouge « af » du logo (provisoire).
 */
export function AdminIcon() {
  return (
    <svg className="graphic-icon" height="100%" width="100%" viewBox="0 0 27 27" aria-hidden="true">
      <rect width="27" height="27" fill="#da002e" />
      <text x="13.5" y="19" textAnchor="middle" fontFamily="Didot, 'Times New Roman', serif" fontSize="17" fill="#fff">
        a<tspan fontStyle="italic">f</tspan>
      </text>
    </svg>
  )
}

export default AdminIcon
