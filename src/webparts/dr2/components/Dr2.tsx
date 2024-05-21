import * as React from 'react';
import type { IDr2Props } from './IDr2Props';
import Button from '@mui/material/Button';
import '../../../styles/dist/tailwind.css'
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IDr2State } from './IDr2State';
import { PnpServices } from '../services/pnpservices';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class Dr2 extends React.Component<IDr2Props, IDr2State> {

  private _sp: PnpServices;

  public storedRows1: any[] = [];

  constructor(props: IDr2Props, state: IDr2State) {
    super(props);

    this.state = {
      status: "Ready",
      ListItems: [],
      ListItem: {
        Id: 0,
        Title: "",
        Email: "",
        Batch: "",
        LevelofKnowledge: "",
      }
    }

    this._sp = new PnpServices(this.props.context);

  }

  private async callAndBindDetailsList(message: string): Promise<any> {
    console.log(await this._sp.getItems(this.props.listName));
    await this._sp.getItems(this.props.listName).then((listItems) => {
      this.setState({
        ListItem: listItems,
        status: message,
      })
    });
  }

  public async _createItem(): Promise<void> {
    try {
      // toast("Default Notification !");
      console.log(`${this.props.listName}`);
      console.log(`${this.state.ListItem}`);
      console.log(`Create method started`);
      const Id = await this._sp.createItem(this.props.listName, this.state.ListItem);
      toast.success("Empolyee Item Created Sucessfully !", {
        position: "top-center"
      });
      console.log(`New item created successfully with ID: ${Id}`);
      await this.callAndBindDetailsList(`New item created successfully with ID: ${Id}`);
    } catch (error) {
      toast.error("Error occured while Creating Item !", {
        position: "top-center"
      });
      console.error('Error occured while Creating Item:', error);
    }
  }

  // Read item list
  private async _readItem(): Promise<any> {
    console.log(this.props.listName + "Read method started ");
    console.log(this.props.listName);
    console.log(this.props.context);
    console.log(this.props.description);
    console.log(this.state.ListItems + "items");
    await this.callAndBindDetailsList("Items fetched successfully");
    toast.success("Empolyee Items Read Sucessfully !", {
      position: "top-center"
    });
  }

  // Update item using name
  public async _updateItem(): Promise<any> {
    console.log(this.props.listName + " Update method started");
    try {
      const itemName = this.state.ListItem.Title;
      console.log('Item Name:', itemName);
      await this._sp.updateItemByName(this.props.listName, itemName, {
        Title: this.state.ListItem.Title,
        Email: this.state.ListItem.Email,
        Batch: this.state.ListItem.Batch,
        LevelofKnowledge: this.state.ListItem.LevelofKnowledge,
      });
      this.callAndBindDetailsList(`Item '${itemName}' updated successfully`);
      toast.success("Empolyee Item Updated Sucessfully !", {
        position: "top-center"
      });
    } catch (error) {
      toast.error("Error occured while Updating Item !", {
        position: "top-center"
      });
      console.error('Error updating item:', error);
    }
  }

  // Delete item using name
  public async _deleteItem(): Promise<any> {
    console.log(this.props.listName + "Delete method started");
    try {
      await this._sp.deleteItemByName(this.props.listName, this.state.ListItem.Title)
        .then(() => {
          this.setState({ status: "Item deleted successfully" })
        })
      toast.success("Empolyee Item Deleted Sucessfully !", {
        position: "top-center"
      });
    } catch (error) {
      toast.error("Error occured while Deleting Item !", {
        position: "top-center"
      });
    }
  }


  public async generateRows() {
    try {
      const listItems = await this._sp.getItems(this.props.listName);
      const rows = listItems.map((item: { Title: any; Email: any; Batch: any; LevelofKnowledge: any; }) => ({
        title: item.Title,
        email: item.Email,
        batch: item.Batch,
        lok: item.LevelofKnowledge
      }));
      this.storedRows1 = rows;
      console.log("Stored Rows:");
      console.log( this.storedRows1);
      console.log("Rows:" + rows);
      return rows;
    } catch (error) {
      console.error("Error generating rows:", error);
      return [];
    }
  }  
  
  componentDidMount(): void {
    this.callAndBindDetailsList("Record Loaded");
  }

  public render(): React.ReactElement<IDr2Props> {

    this.generateRows();
    const batches = [
      {
        value: '1',
        label: 'Batch 1',
      },
      {
        value: '2',
        label: 'Batch 2',
      },
      {
        value: '3',
        label: 'Batch 3',
      },
      {
        value: '4',
        label: 'Batch 4',
      },
    ];

    const lok = [
      {
        value: '1',
        label: 'Beginner',
      },
      {
        value: '2',
        label: 'Intermediate',
      },
      {
        value: '3',
        label: 'Advanced',
      },
    ];

    return (
      <section>
        <div>
          <h2 className='mb-5'>Welcome to SharePoint Framework CRUD React created by Devansh Jain!</h2>
          <h3 className='mt-2'>User Form</h3>
          <Stack direction="column" spacing={3}>
            <TextField id="outlined-basic" label="Username" variant="standard" size="small"
              value={this.state.ListItem.Title}
              onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                const newValue = e.target.value;
                this.setState((state) => ({
                  ListItem: {
                    ...state.ListItem,
                    Title: newValue
                  }
                }));
              }}
            />
            <TextField id="outlined-basic" label="Email" variant="standard" size="small"
              value={this.state.ListItem.Email}
              onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                const newValue = e.target.value;
                this.setState((state) => ({
                  ListItem: {
                    ...state.ListItem,
                    Email: newValue
                  }
                }));
              }}
            />
            <TextField
              id="outlined-select-batch"
              select
              label="Select"
              defaultValue={this.state.ListItem.Batch}
              helperText="Please select your batch"
              size="small"
              value={this.state.ListItem.Batch}
              onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                const newValue = e.target.value;
                this.setState((state) => ({
                  ListItem: {
                    ...state.ListItem,
                    Batch: newValue
                  }
                }));
              }}
            >
              {batches.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="outlined-select-lok"
              select
              label="Select"
              defaultValue={this.state.ListItem.LevelofKnowledge}
              helperText="Please select your Level of Knowledge"
              size="small"
              value={this.state.ListItem.LevelofKnowledge}
              onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                const newValue = e.target.value;
                this.setState((state) => ({
                  ListItem: {
                    ...state.ListItem,
                    LevelofKnowledge: newValue
                  }
                }));
              }}
            >
              {lok.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
          <h3>List Operations</h3>
          <Stack direction="row" spacing={2}>
            <div><Button variant="outlined" onClick={(e) => this._createItem()}>Create</Button><ToastContainer /></div>
            <div><Button variant="outlined" onClick={(e) => this._readItem()}>Read</Button><ToastContainer /></div>
            <div><Button variant="outlined" onClick={(e) => this._updateItem()}>Update</Button><ToastContainer /></div>
            <div><Button variant="outlined" onClick={(e) => this._deleteItem()}>Delete</Button><ToastContainer /></div>
          </Stack>

        </div>
        <div>
          <h3>User List Values</h3>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Batch</TableCell>
                  <TableCell>Level</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.storedRows1.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">{row.title}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.batch}</TableCell>
                    <TableCell>{row.lok}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </section >
    );
  }
}
