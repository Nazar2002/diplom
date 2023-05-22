import './style.scss';

const BigLoader = () => {
  return (
    <div className="big-loader__loading">
      <div className="big-loader__preloader">
        <div className="big-loader__loader one" />
        <div className="big-loader__loader two" />
        <div className="big-loader__loader three" />
      </div>
    </div>
  );
};

export { BigLoader };
