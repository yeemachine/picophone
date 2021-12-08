function getRowsCount(items, cols) {
  const getItemsMaxHeight = items.map((val) => {
    const item = val[cols];
    return (item && item.y) + (item && item.h) || 0;
  });
  return Math.max(...getItemsMaxHeight, 1);
}
const makeMatrix = (rows, cols) => Array.from(Array(rows), () => new Array(cols));
function makeMatrixFromItems(items, _row, _col) {
  let matrix = makeMatrix(_row, _col);
  for (var i = 0; i < items.length; i++) {
    const value = items[i][_col];
    if (value) {
      const {x, y, h} = value;
      const id = items[i].id;
      const w = Math.min(_col, value.w);
      for (var j = y; j < y + h; j++) {
        const row = matrix[j];
        for (var k = x; k < x + w; k++) {
          row[k] = {...value, id};
        }
      }
    }
  }
  return matrix;
}
function findCloseBlocks(items, matrix, curObject) {
  const {h, x, y} = curObject;
  const w = Math.min(matrix[0].length, curObject.w);
  const tempR = matrix.slice(y, y + h);
  let result = [];
  for (var i = 0; i < tempR.length; i++) {
    let tempA = tempR[i].slice(x, x + w);
    result = [...result, ...tempA.map((val) => val.id && val.id !== curObject.id && val.id).filter(Boolean)];
  }
  return [...new Set(result)];
}
function makeMatrixFromItemsIgnore(items, ignoreList, _row, _col) {
  let matrix = makeMatrix(_row, _col);
  for (var i = 0; i < items.length; i++) {
    const value = items[i][_col];
    const id = items[i].id;
    const {x, y, h} = value;
    const w = Math.min(_col, value.w);
    if (ignoreList.indexOf(id) === -1) {
      for (var j = y; j < y + h; j++) {
        const row = matrix[j];
        if (row) {
          for (var k = x; k < x + w; k++) {
            row[k] = {...value, id};
          }
        }
      }
    }
  }
  return matrix;
}
function findItemsById(closeBlocks, items) {
  return items.filter((value) => closeBlocks.indexOf(value.id) !== -1);
}
function findFreeSpaceForItem(matrix, item) {
  const cols = matrix[0].length;
  const w = Math.min(cols, item.w);
  let xNtime = cols - w;
  let getMatrixRows = matrix.length;
  for (var i = 0; i < getMatrixRows; i++) {
    const row = matrix[i];
    for (var j = 0; j < xNtime + 1; j++) {
      const sliceA = row.slice(j, j + w);
      const empty = sliceA.every((val) => val === void 0);
      if (empty) {
        const isEmpty = matrix.slice(i, i + item.h).every((a) => a.slice(j, j + w).every((n) => n === void 0));
        if (isEmpty) {
          return {y: i, x: j};
        }
      }
    }
  }
  return {
    y: getMatrixRows,
    x: 0
  };
}
const getItem = (item, col) => {
  return {...item[col], id: item.id};
};
const updateItem = (elements, active, position, col) => {
  return elements.map((value) => {
    if (value.id === active.id) {
      return {...value, [col]: {...value[col], ...position}};
    }
    return value;
  });
};
function moveItem(active, items, cols, original) {
  const item = getItem(active, cols);
  let matrix = makeMatrixFromItemsIgnore(items, [item.id], getRowsCount(items, cols), cols);
  const closeBlocks = findCloseBlocks(items, matrix, item);
  let closeObj = findItemsById(closeBlocks, items);
  const fixed = closeObj.find((value) => value[cols].fixed);
  if (fixed)
    return items;
  items = updateItem(items, active, item, cols);
  matrix = makeMatrixFromItemsIgnore(items, closeBlocks, getRowsCount(items, cols), cols);
  let tempItems = items;
  let tempCloseBlocks = closeBlocks;
  let exclude = [];
  closeObj.forEach((item2) => {
    let position = findFreeSpaceForItem(matrix, item2[cols]);
    exclude.push(item2.id);
    tempItems = updateItem(tempItems, item2, position, cols);
    let getIgnoreItems = tempCloseBlocks.filter((value) => exclude.indexOf(value) === -1);
    matrix = makeMatrixFromItemsIgnore(tempItems, getIgnoreItems, getRowsCount(tempItems, cols), cols);
  });
  return tempItems;
}
function normalize(items, col) {
  let result = items.slice();
  result.forEach((value) => {
    const getItem2 = value[col];
    if (!getItem2.static) {
      result = moveItem(getItem2, result, col);
    }
  });
  return result;
}
function adjust(items, col) {
  let matrix = makeMatrix(getRowsCount(items, col), col);
  let res = [];
  items.forEach((item) => {
    let position = findFreeSpaceForItem(matrix, item[col]);
    res.push({
      ...item,
      [col]: {
        ...item[col],
        ...position
      }
    });
    matrix = makeMatrixFromItems(res, getRowsCount(res, col), col);
  });
  return res;
}
function makeItem(item) {
  const {min = {w: 1, h: 1}, max} = item;
  return {
    fixed: false,
    resizable: !item.fixed,
    draggable: !item.fixed,
    customDragger: false,
    customResizer: false,
    min: {
      w: Math.max(1, min.w),
      h: Math.max(1, min.h)
    },
    max: {...max},
    ...item
  };
}
const gridHelp = {
  normalize(items, col) {
    getRowsCount(items, col);
    return normalize(items, col);
  },
  adjust(items, col) {
    return adjust(items, col);
  },
  item(obj) {
    return makeItem(obj);
  },
  findSpace(item, items, cols) {
    let matrix = makeMatrixFromItems(items, getRowsCount(items, cols), cols);
    let position = findFreeSpaceForItem(matrix, item[cols]);
    return position;
  }
};

export default gridHelp;
