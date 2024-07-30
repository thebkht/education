import SkeletonPrimitive, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface SkeletonProps extends React.ComponentProps<typeof SkeletonPrimitive> {
  containerClassName?: string;
  baseColor?: string;
  highlightColor?: string;
  // Add other props that SkeletonPrimitive might expect
}

const Index: React.FC<SkeletonProps> = ({
  containerClassName,
  baseColor,
  highlightColor,
  ...props
}) => {
  return (
    <SkeletonTheme baseColor={baseColor} highlightColor={highlightColor}>
      <SkeletonPrimitive containerClassName={containerClassName} {...props} />
    </SkeletonTheme>
  );
};

Index.displayName = "Skeleton";

export { Index as Skeleton };
