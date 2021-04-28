import React from 'react';
import { connect } from 'react-redux';
import { getAllOrderHistoryThunk } from '../../store/redux/orderHistory'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { DataGrid } from '@material-ui/data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headername: 'Name', width: 200 },
];

export class OrderHistory extends React.Component {

 componentDidMount() {
    this.props.getOrders(this.props.match.params.userId)
}

  render(){
      const orders = this.props.orders
      return (
        <div>
        <Paper margin='auto' maxWidth={500} >
            <Typography gutterBottom variant="h3" style={{ marginTop: 5 }}>
                Your Orders History 
                </Typography>
            <Box display="flex" justifyContent="center">
            <Grid container spacing={12}>
                {orders.map(order => {
                    return (
                      <Grid item xs={12} sm container style={{ margin: 5 }}>
                      <Paper style={{ padding: 100 }}>

                      <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                        <Typography gutterBottom variant="h4">
                          Order {order.id}
                        </Typography>
                              <div style={{ display: 'flex', height: 300, background: "white"}}>
                              <div style={{ flexGrow: 1}}>
                                <DataGrid columns={columns} rows={order.ringtones} />
                              </div>
                            </div>
                          </Grid>
                        </Grid>
                        <Grid item>
                          <Typography variant="h4" style={{ marginTop: 10 }}>TOTAL PRICE: ${order.totalPrice/100}</Typography>    
                        </Grid>

                      </Paper>
                      </Grid>
                    )
                })}
              </Grid>
              </Box>
          </Paper>
        </div>
      )
  }
}
  const mapState = (state) => ({
    orders: state.orders,
    userId: state.auth.id,
  });

  const mapDispatch = (dispatch) => {
    return {
        getOrders: (userId) => dispatch(getAllOrderHistoryThunk(userId))
    };
  };
  
  export default connect(mapState, mapDispatch)(OrderHistory);