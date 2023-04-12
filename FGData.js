import React, { useEffect, useState } from "react";
import { IoMdRefresh } from "react-icons/io";
import { Link } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import { useNavigate } from "react-router-dom";

import "../App.css";

const FGData = ({ order, setOrder }) => {
  const [selectedIndexes, setSelectedIndexes] = useState([]);
  const [data, setData] = useState(order);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const hadleRefresh = () => {
    window.location.reload();
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const handleDeleteData = e => {
    let orderedData = data.filter(
      (_, index) => !selectedIndexes.includes(index)
    );
    setOrder(orderedData);
    setSelectedIndexes([]);
  };

  useEffect(() => {
    if (
      searchTerm === "" ||
      searchTerm === null ||
      searchResults.length === 0
    ) {
      setData(order);
    } else {
      setData(searchResults);
    }
    if (loading && !Object.keys(customerFeedbackData).length) {
      navigate("/empty-list");
    }
  }, [data, selectedIndexes, order, searchTerm, searchResults]);

  const filterIt = searchValue => {
    setSearchTerm(searchValue);
    if (searchTerm === "") {
      setSearchResults([]);
      setData(order);
    } else {
      let fiterItData = data.filter(obj =>
        Object.keys(obj).some(key => {
          return obj.data.name.toLowerCase().includes(searchTerm.toLowerCase());
        })
      );
      setData(orderedData);
      setSearchResults(orderedData);
    }
  };

  const checkboxStyles = {
    height: "16px",
    width: "16px",
    "&.Mui-checked": {
      color: "#8870C9",
    },
  };

  return (
    <div className="fg-data-body">
      <div className="fg-data-header">
        <div>
          <p className="fg-data-header-heading">Aromatic bar</p>
          <p className="fg-data-header-sub-heading">
            {Object.keys(data).length} records found. {searchTerm ? 1 : 0}{" "}
            filters applied
          </p>
        </div>
        <div className="fg-data-functions">
          <div>
            <input
              type="search"
              placeholder="Search"
              className="search-input"
              value={searchTerm}
              onChange={e => {
                filterIt(e.target.value);
              }}
            />
          </div>
          <div className="refresh-icon">
            <IoMdRefresh
              size={20}
              onClick={() => {
                hadleRefresh();
              }}
              title="Refresh"
            />
          </div>
          <div>
            <Link to="/">
              <button className="add-new-button">Add New</button>
            </Link>
          </div>
        </div>
      </div>
      <div className="fg-data-table-body">
        <div className="fg-data-table">
          <table>
            <thead className="fg-table-header">
              <tr style={{ minHeight: "35px" }}>
                <th style={{ minWidth: "100px" }}>
                  <Checkbox
                    indeterminate={true}
                    sx={{
                      "&.MuiCheckbox-indeterminate": {
                        color: "#8870C9",
                      },
                    }}
                  />
                </th>
                <th style={{ minWidth: "189px" }}>Ingredient ID</th>
                <th style={{ minWidth: "172px" }}>Food </th>
                <th style={{ minWidth: "199px" }}>price</th>
                <th style={{ minWidth: "450px" }}>
                </th>
                <th style={{ minWidth: "350px" }}>
                </th>
                <th style={{ minWidth: "300px" }}></th>
                <th style={{ minWidth: "419px" }}>
                </th>
              </tr>
            </thead>
            <tbody
              style={{
                backgroundColor: "#FFFFFF",
              }}
            >
              {data.map((item, index) => (
                <tr key={index}>
                  <td>
                    <Checkbox
                      checked={selectedIndexes.includes(index)}
                      onChange={e => {
                        if (e.target.checked) {
                          setSelectedIndexes([...selectedIndexes, index]);
                        } else {
                          setSelectedIndexes(
                            selectedIndexes.filter(i => i !== index)
                          );
                        }
                      }}
                      sx={{ ...checkboxStyles }}
                    />
                  </td>
                  <td>{item.data.name}</td>
                  <td style={{ padding: "5px" }}>{item.data.email}</td>
                  <td>{item.data.phoneNumber}</td>
                  <td>{item.data.qualityOfService}</td>
                  <td>{item.data.qualityOfBeverage}</td>
                  <td>{item.data.qualityOfCleanliness}</td>
                  <td>{item.data.diningExperience}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="aromatic-footer">
        <div className="btnWrapper">
          <button
            type="submit"
            className="btnDanger"
            onClick={() => handleDeleteData()}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default FGData;
