import React from 'react';

const random = (
  Tile,
  TileOptions,
  tileClassName,
  Summary,
  SummaryOptions,
  summaryClassName,
  data,
  keyAccessor,
  toAccessor,
  mediaAccessor,
  accessibilityAccessor,
  inViewportIndex,
) => data.map((datum, i) => {
  const tileOptions = {};
  const summaryOptions = {};
  Object.keys(TileOptions).forEach((key) => {
    tileOptions[key] = TileOptions[key][Math.floor(Math.random() * TileOptions[key].length)];
  });
  Object.keys(SummaryOptions).forEach((key) => {
    summaryOptions[key] =
    SummaryOptions[key][Math.floor(Math.random() * SummaryOptions[key].length)];
  });
  return (
    <Tile
      { ...tileOptions }
      key={ keyAccessor(datum) }
      to={ toAccessor(datum) }
      media={ mediaAccessor(datum) }
      accessibility={ accessibilityAccessor(datum) }
      className={ tileClassName }
      active={ i === inViewportIndex }
    ><Summary
      { ...summaryOptions }
      title={ datum.title }
      description={ datum.description }
      keywords={ datum.keywords }
      className={ summaryClassName }
    />
    </Tile>
  );
});

const cycle = (
  Tile,
  TileOptions,
  tileClassName,
  Summary,
  SummaryOptions,
  summaryClassName,
  data,
  keyAccessor,
  toAccessor,
  mediaAccessor,
  accessibilityAccessor,
  inViewportIndex,
) => {
  const tiles = [];
  const tileOptions = {
    options: {},
    index: {},
  };
  const summaryOptions = {
    options: {},
    index: {},
  };
  Object.keys(TileOptions).forEach((key) => {
    tileOptions.index[key] = 0;
  });
  Object.keys(SummaryOptions).forEach((key) => {
    summaryOptions.index[key] = 0;
  });
  data.forEach((datum, i) => {
    Object.keys(TileOptions).forEach((key) => {
      tileOptions.options[key] =
      TileOptions[key][tileOptions.index[key] % TileOptions[key].length];
      tileOptions.index[key] += 1;
    });
    Object.keys(SummaryOptions).forEach((key) => {
      summaryOptions.options[key] =
      SummaryOptions[key][summaryOptions.index[key] % SummaryOptions[key].length];
      summaryOptions.index[key] += 1;
    });
    tiles.push(
      <Tile
        { ...tileOptions }
        key={ keyAccessor(datum) }
        to={ toAccessor(datum) }
        media={ mediaAccessor(datum) }
        accessibility={ accessibilityAccessor(datum) }
        className={ tileClassName }
        active={ i === inViewportIndex }
      >
        <Summary
          { ...summaryOptions }
          title={ datum.title }
          description={ datum.description }
          keywords={ datum.keywords }
          className={ summaryClassName }
        />
      </Tile>);
  });
  return tiles;
};

export default { random, cycle };
