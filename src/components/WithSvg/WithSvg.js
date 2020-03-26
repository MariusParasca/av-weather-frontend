import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const WithSvg = ({ component: Svg, size, className, width, height, responsive }) => {
  const [svgImported, setSvgImported] = useState('');

  let actualWidth = width;
  let actualHeight = height;
  if (size && !width && !height) {
    actualWidth = size;
    actualHeight = size;
  }

  useEffect(() => {
    const getSvg = async () => {
      const svg = await import(`../../${Svg}`);
      setSvgImported(svg.default);
    };
    if (typeof Svg === 'string') {
      getSvg();
    }
  }, [Svg]);

  const SvgIcon = () => {
    if (typeof Svg === 'string') {
      return svgImported ? (
        <img
          alt="svgIcon"
          src={svgImported}
          style={
            responsive
              ? {
                  maxWidth: actualWidth,
                  height: 'auto',
                  width: '100%',
                }
              : {
                  width: actualWidth,
                  height: actualHeight,
                }
          }
        />
      ) : (
        <div
          style={{
            width: actualWidth,
            height: actualHeight,
          }}
        ></div>
      );
    }
    return <Svg width={actualWidth} height={actualHeight} className={className} />;
  };

  return <SvgIcon />;
};

WithSvg.propTypes = {
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  size: PropTypes.number,
  className: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  responsive: PropTypes.bool,
};
WithSvg.defaultProps = {
  size: 32,
  className: '',
  responsive: true,
  width: undefined,
  height: undefined,
};

export default WithSvg;
