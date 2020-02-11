const React = require('react');
const PropTypes = require('prop-types');

const { formatDuration } = require('./util');


const TimelineSeg = ({
  isCutRangeValid, duration: durationRaw, cutStartTime, cutEndTime, apparentCutStart,
  apparentCutEnd, isActive, segNum, onSegClick, color,
}) => {
  const markerWidth = 4;
  const duration = durationRaw || 1;
  const cutSectionWidth = `calc(${((apparentCutEnd - apparentCutStart) / duration) * 100}% - ${markerWidth * 2}px)`;

  const startTimePos = `${(apparentCutStart / duration) * 100}%`;
  const endTimePos = `${(apparentCutEnd / duration) * 100}%`;
  const markerBorder = isActive ? `2px solid ${color.string()}` : undefined;
  const markerBorderRadius = 5;

  const startMarkerStyle = {
    background: color.alpha(0.5).string(),
    width: markerWidth,
    left: startTimePos,
    borderLeft: markerBorder,
    borderTopLeftRadius: markerBorderRadius,
    borderBottomLeftRadius: markerBorderRadius,
  };
  const endMarkerStyle = {
    background: color.alpha(0.5).string(),
    width: markerWidth,
    marginLeft: -markerWidth,
    left: endTimePos,
    borderRight: markerBorder,
    borderTopRightRadius: markerBorderRadius,
    borderBottomRightRadius: markerBorderRadius,
  };
  const cutSectionStyle = {
    background: color.alpha(0.5).string(),
    marginLeft: markerWidth,
    left: startTimePos,
    width: cutSectionWidth,
  };

  const onThisSegClick = () => onSegClick(segNum);

  return (
    <React.Fragment>
      {cutStartTime !== undefined && (
        <div style={startMarkerStyle} className="cut-time-marker" role="button" tabIndex="0" onClick={onThisSegClick} />
      )}
      {isCutRangeValid && (cutStartTime !== undefined || cutEndTime !== undefined) && (
        <div
          className="cut-section"
          style={cutSectionStyle}
          role="button"
          tabIndex="0"
          onClick={onThisSegClick}
          title={`${formatDuration(cutEndTime - cutStartTime)}`}
        />
      )}
      {cutEndTime !== undefined && (
        <div style={endMarkerStyle} className="cut-time-marker" role="button" tabIndex="0" onClick={onThisSegClick} />
      )}
    </React.Fragment>
  );
};

TimelineSeg.propTypes = {
  isCutRangeValid: PropTypes.bool.isRequired,
  duration: PropTypes.number,
  cutStartTime: PropTypes.number,
  cutEndTime: PropTypes.number,
  apparentCutStart: PropTypes.number.isRequired,
  apparentCutEnd: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
  segNum: PropTypes.number.isRequired,
  onSegClick: PropTypes.func.isRequired,
  color: PropTypes.object.isRequired,
};

TimelineSeg.defaultProps = {
  duration: undefined,
  cutStartTime: undefined,
  cutEndTime: undefined,
};

module.exports = TimelineSeg;
