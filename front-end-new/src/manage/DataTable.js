import React, { useCallback, memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import EditIcon from "@material-ui/icons/EditOutlined";
import DoneIcon from "@material-ui/icons/DoneAllTwoTone";
import RevertIcon from "@material-ui/icons/NotInterestedOutlined";
import Input from "@material-ui/core/Input";
import DialogPanel from '../components/panel/DialogPanel'
import SaveIcon from '@material-ui/icons/Save';
import { Snack } from '../mylib/supports/jsxStyle'
import { findIndex } from 'lodash'
const CustomTableCell = memo(({ row, field, onChange }) => {
  const classes = useStyles();
  const { isEditMode } = row;
  // React.useEffect(() => {

  // }, [])
  return (
    <TableCell align="left" className={classes.tableCell}>
      {isEditMode ? (
        <Input
          value={row[field]}
          name={field}
          onChange={e => onChange(e, row)}
          className={classes.input}
          color='secondary'
        />
      ) : (
          row[field]
        )}
    </TableCell>
  );
})
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}



const EnhancedTableHead = memo((props) => {
  const {
    classes, onSelectAllClick, order, orderBy,
    numSelected, rowCount, onRequestSort, headCells } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
})

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
  headCells: PropTypes.array.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  title: {
    flex: '1 1 100%',
  },
}));

const EnhancedTableToolbar = memo((props) => {
  const classes = useToolbarStyles();
  const { numSelected, title, setOpenDialog } = props;
  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
          <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
            {title}
          </Typography>
        )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete" onClick={() => setOpenDialog(true)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
          <Tooltip title="Filter list">
            <IconButton aria-label="filter list">
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
    </Toolbar>
  );
})

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',    
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  container: {
    maxHeight: 440,
  },
}));
const addPropRows = (rows) => {
  return rows.map(row => {
    return {
      ...row,
      isEditMode: false
    }
  })
}
const DataTable = (props) => {
  const { previousSelected, updateState, title, dataRows, headCells, obj, deleteRows } = props
  const [rows, setRows] = useState(addPropRows(dataRows))
  const classes = useStyles();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [selected, setSelected] = useState(previousSelected);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDialog, setOpenDialog] = useState(false)
  const [changes, setChanges] = useState([])
  // start edit row
  const [previous, setPrevious] = useState({});
  const [snack, setSnack] = React.useState({
    message: '',
    status: '',
    open: false,
  })
  const onToggleEditMode = id => {
    setRows(state => {
      return rows.map(row => {
        if (row[obj.id] === id) {
          return { ...row, isEditMode: !row.isEditMode };
        }
        return row;
      });
    });
  };

  const onChange = (e, row) => {
    if (!previous[row[obj.id]]) {
      setPrevious(state => ({ ...state, [row[obj.id]]: row }));
    }
    const value = e.target.value;
    const name = e.target.name;
    const id = row[obj.id]
    const newRows = rows.map(row => {
      if (row[obj.id] === id) {
        setChanges(() => changes.concat({
          id,
          data: row
        }))
        return { ...row, [name]: value };
      }
      return row;
    });
    setRows(newRows);
  };

  const onRevert = id => {
    const newRows = rows.map(row => {
      if (row[obj.id] === id) {
        return previous[id] ? previous[id] : row;
      }
      return row;
    });
    setRows(newRows);
    setPrevious(state => {
      delete state[id];
      return state;
    });
    onToggleEditMode(id);
  };
  // end edit row

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n[obj['id']]);
      setSelected(newSelecteds);
      updateState(newSelecteds)
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    updateState(newSelected)
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  useEffect(() => {
    // console.log('render DataTable', rows[0])
    // console.log('obj: ', obj)
  }, [])
  const onYesClick = useCallback((e) => {
    e.stopPropagation()
    setOpenDialog(false)
    console.log('yes', selected)

    deleteRows(selected).then(res => {
      if (res.status === 200) {
        const newRows = rows.filter(row => findIndex(selected, (id) => id === row[obj.id]) >= 0 ? false : true)
        setRows(newRows)
      }
      setSnack({
        message: res.message,
        status: res.status,
        open: true
      })
      // TODO: remove from rows by filter: 

    })

  }, [selected])

  const onCloseClick = useCallback((e) => {
    e.stopPropagation()
    setOpenDialog(false)
    console.log('no')
  }, [])

  useEffect(() => {
    console.log('selected change', selected)
  }, [selected])
  const closeSnack = React.useCallback(() => {
    setSnack({
      ...snack,
      open: false,
    })
  }, [snack])
  return (
    <div className={classes.root}>
      <DialogPanel
        title={`Delete ${selected.length} ${title}`}
        content={`Do you really want to remove these ${title} ?`}
        yesText='Delete' noText='No' isOpen={openDialog}
        onYesClick={onYesClick}
        onCloseClick={onCloseClick}
      />
      <Snack mess={snack.message} status={snack.status}
        isOpenSnack={snack.open} onSnackClose={closeSnack}
      />
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected.length} title={title} setOpenDialog={setOpenDialog} />
        <TableContainer className={classes.container}>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={'small'}
            aria-label="enhanced table"
            stickyHeader aria-label="sticky table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              headCells={headCells}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row[obj.id]);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      key={row[obj.id] + title}
                      hover
                      onClick={(event) => !row.isEditMode && handleClick(event, row[obj.id])}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}

                      selected={isItemSelected}
                    >
                      <TableCell className={classes.selectTableCell}>
                        {row.isEditMode ? (
                          <>
                            <IconButton
                              aria-label="done"
                              onClick={() => onToggleEditMode(row[obj.id])}
                            >
                              <DoneIcon />
                            </IconButton>
                            <IconButton
                              aria-label="revert"
                              onClick={() => onRevert(row[obj.id])}
                            >
                              <RevertIcon />
                            </IconButton>
                          </>
                        ) : (
                            <IconButton
                              aria-label="delete"
                              onClick={(event) => {
                                !row.isEditMode && handleClick(event, row[obj.id])
                                onToggleEditMode(row[obj.id])
                              }}
                            >
                              <EditIcon />
                            </IconButton>
                          )}
                      </TableCell>
                      {/* {row[obj.order[index + 1]]} */}
                      {
                        obj.order.map((gen, index) => (                          
                          <CustomTableCell key={row[obj.id] + ':' + index} {...{ row, field: obj.order[index], onChange }} />
                          
                        ))

                      }
                    </TableRow>                    
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 33 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <div style={{ display: 'flex', justifyContent: 'center', justifyItems: 'center', marginBottom: '1%' }}>
        <Button startIcon={<SaveIcon />}
          color="secondary"
          variant='contained'
          onClick={() => console.log(changes)}
        >Apply Changes</Button>
      </div>
    </div>
  );
}
export default memo(DataTable)