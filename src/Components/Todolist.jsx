import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

const Todolist = () => {
  const [value, setvalue] = useState();
  const [togglebtn, settogglebtn] = useState(false);
  const [edit_element_id, set_edit_element_id] = useState("");

  // functionto get items from localStorage
  const getitemsfromlocal = () => {
    const items = localStorage.getItem("mylist");

    if (items) {
      return JSON.parse(items);
    } else {
      return [];
    }
  };
  const [items, setitems] = useState(getitemsfromlocal);

  // onchange event function
  const changeevent = (e) => {
    setvalue(e.target.value);
  };

  // function to add items in array
  const addItem = () => {
    if (!value) {
      alert("plzz include something first");
    } else if (value && togglebtn) {
      setitems(
        items.map((curElm, index) => {
          if (index === edit_element_id) {
            return { name: value };
          }

          return curElm;
        })
      );
      settogglebtn(false);
    } else {
      setitems([
        ...items,
        {
          name: value,
        },
      ]);
    }
    setvalue("");
  };

  // function to update items
  const updateitem = (id) => {
    const editeditems = items.find((curElm, index) => {
      return index === id;
    });
    setvalue(editeditems.name);
    set_edit_element_id(id);
    settogglebtn(true);
  };

  // function to delete items
  const deleteitem = (id) => {
    const newitems = items.filter((curElm, index) => {
      return index !== id;
    });
    setitems(newitems);
  };

  // function to delete all items
  const removeall = () => {
    setitems([]);
  };

  // use effect to add items in local storage
  useEffect(() => {
    localStorage.setItem("mylist", JSON.stringify(items));
  }, [items]);
  return (
    <>
      {/* input items */}
      <div className="container inputcont mx-auto">
        <h1>Todolist</h1>
        <div className="input-group flex-nowrap">
          <input
            type="text"
            className="form-control"
            placeholder="✍  Add your text"
            aria-label="Username"
            aria-describedby="addon-wrapping"
            value={value}
            onChange={changeevent}
          />
          {togglebtn ? (
            <Button variant="contained" color="error" onClick={addItem}>
              <ChangeCircleIcon />
            </Button>
          ) : (
            <Button variant="contained" color="error" onClick={addItem}>
              <SendIcon />
            </Button>
          )}
        </div>
      </div>

      {/* display items */}
      <div className="container displaycont">
        {items.map((curElm, index) => {
          return (
            <div className="items" key={index}>
              <IconButton
                color="error"
                aria-label="upload picture"
                component="label"
                onClick={() => deleteitem(index)}
              >
                <DeleteIcon />
              </IconButton>
              <h3>{curElm.name}</h3>
              <IconButton
                color="error"
                aria-label="upload picture"
                component="label"
                onClick={() => updateitem(index)}
              >
                <ChangeCircleIcon />
              </IconButton>
            </div>
          );
        })}
      </div>
      <div className="container inputcont mx-auto">
        <Button variant="contained" color="error" onClick={removeall}>
          Remove All
        </Button>
      </div>
    </>
  );
};

export default Todolist;
