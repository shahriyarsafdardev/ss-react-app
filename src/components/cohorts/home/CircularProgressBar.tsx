const CircularProgressbar = ({
  strokeWidth,
  completedSteps,
  totalSteps
}: {
  strokeWidth: number;
  completedSteps: number;
  totalSteps: number;
}) => {
  const radius = 50 - strokeWidth / 2;
  const pathDescription = `
      M 50,50 m 0,-${radius}
      a ${radius},${radius} 0 1 1 0,${2 * radius}
      a ${radius},${radius} 0 1 1 0,-${2 * radius}
    `;

  const diameter = Math.PI * 2 * radius;
  const percentage = (completedSteps / totalSteps) * 100;

  return (
    <svg className="CircularProgressbar" viewBox="0 0 100 100" width={50} height={50}>
      <path
        className="CircularProgressbar-trail"
        d={pathDescription}
        strokeWidth={strokeWidth}
        fillOpacity={0}
        style={{
          stroke: '#d6d6d6'
        }}
      />

      <path
        className="CircularProgressbar-path"
        d={pathDescription}
        strokeWidth={strokeWidth}
        fillOpacity={0}
        style={{
          stroke: '#4D4DCD',
          strokeDasharray: `${diameter}px ${diameter}px`,
          strokeDashoffset: `${((100 - percentage) / 100) * diameter}px`
        }}
      />

      <text
        className="CircularProgressbar-text"
        x={50}
        y={50}
        style={{
          fontSize: '24px',
          fontWeight: 600,
          dominantBaseline: 'central',
          textAnchor: 'middle'
        }}
      >
        {`${completedSteps}/${totalSteps}`}
      </text>
    </svg>
  );
};

export default CircularProgressbar;
