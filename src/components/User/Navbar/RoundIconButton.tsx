// const RoundIconButton = ({
//   Icon,
//   onClick,
//   badgeCount,
//   ariaLabel,
// }: {
//   Icon: React.ElementType;
//   onClick: () => void;
//   badgeCount?: number;
//   ariaLabel: string;
// }) => (
//   <div className="relative">
//     <button onClick={onClick} className="btn btn-ghost btn-circle hover:bg-base-200" aria-label={ariaLabel}>
//       <Icon className="w-5 h-5 text-base-content" />
//     </button>

//     {badgeCount && badgeCount > 0 && (
//       <span
//         className="absolute -top-1 -right-1 inline-flex items-center justify-center
//         px-2 py-1 text-xs font-bold text-white bg-error rounded-full min-w-[18px] h-[18px]"
//       >
//         {badgeCount > 9 ? '9+' : badgeCount}
//       </span>
//     )}
//   </div>
// );
