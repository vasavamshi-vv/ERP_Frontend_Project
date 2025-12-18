import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./createNewSupplier.css";
// import SupplierListItem from "./supplierListItem";
import SupplierComment from "./supplierComment";
import SupplierHistory from "./supplierHistory";
import SupplierAttachment from "./supplierAttachment";
import { toast } from "react-toastify";

export default function createNewSupplier() {
  const [SupplierStatus, setSupplierStatus] = useState("");

  const [ApiSupplier, SetApiSupplier] = useState({});
  const [SupplierData, setSupplierData] = useState([]);
  const [SupplierItem, setSupplierItem] = useState([]);

  const [numOfSupplierList, setnumOfSupplierList] = useState(1);
  const [SupplierListData, setSupplierListData] = useState([{ unique_key: 0 }]);
  const prevpg = useNavigate();

  const SupplierFromApi = {
    SupplierItem: [
      {
        product_name: "T-shirt",
        product_id: "UKB-101",
        uom: ["PCS", "TCS"],
        in_stock: "20",
        qty_ordered: "100",
        insufficient_stock: "20",
        total: "1000",
      },
      {
        product_name: "M-shirt",
        product_id: "UKB-102",
        uom: ["EPS", "TCS"],
        in_stock: "10",
        qty_ordered: "50",
        insufficient_stock: "20",
        total: "1000",
      },
      {
        product_name: "E-shirt",
        product_id: "UKB-103",
        uom: ["OPS", "DRS"],
        in_stock: "20",
        qty_ordered: "10",
        insufficient_stock: "20",
        total: "1000",
      },
    ],
    SupplierData: [
      // Fixed from 'purchasData' to 'SupplierData'
      {
        supplier_id: "SUP-001 - Microtronix Pvt Ltd",
        supplier_name: "Microtronix Pvt Ltd",
      },
      {
        supplier_id: "SUP-002 – Bright Office Supplies",
        supplier_name: "Bright Office Supplies",
      },
    ],
  };
  const [detail, setDetail] = useState({
    comment: true,
    history: false,
    attachment: false,
  });

  const [SupplierInput, setSupplierInput] = useState({
    po_id: "",
    po_date: "",
    sales_order_ref: "",
    delivery_date: "",
    supplier_id: "",
    supplier_name: "",
    payment_trems: "",
    inco_terms: "",
    notes_comments: "",
    currency: "",
    global_discount: "",
    shipping_charges: "",
  });

  useEffect(() => {
    SetApiSupplier(SupplierFromApi);
  }, []);

  useEffect(() => {
    if (Object.keys(ApiSupplier).length > 0) {
      setSupplierData(ApiSupplier.SupplierData);
      setSupplierItem(ApiSupplier.SupplierItem);
    }
  }, [ApiSupplier]);
  useEffect(() => {
    const selected = SupplierInput.supplier_id;

    if (selected && SupplierData.length > 0) {
      const supplier = SupplierData.find((ele) => ele.supplier_id === selected);
      if (supplier) {
        setSupplierInput((prev) => ({
          ...prev,
          supplier_name: supplier.supplier_name,
          supplier_id: supplier.supplier_id,
        }));
      }
    }
  }, [SupplierInput.supplier_id, SupplierData]);

  const handleSupplierInputChange = (e) => {
    setSupplierInput((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
  };

  //status
  const [SupplierBtn, setSupplierBtn] = useState({
    buttonAcs: true,
    cancel_order: true,
    draft: false,
    submit_po: false,
    pdf: true,
    mail: true,
    stock_receipt: true,
  });

  useEffect(() => {
    if (SupplierStatus === "") {
      setSupplierBtn((prev) => ({
        ...prev,
        buttonAcs: false,
        cancel_order: true,
        draft: false,
        submit_po: false,
        pdf: true,
        mail: true,
        stock_receipt: true,
      }));
    }
    switch (SupplierStatus) {
      case "Draft":
        setSupplierBtn((prev) => ({
          ...prev,
          buttonAcs: false,
          cancel_order: true,
          draft: false,
          submit_po: false,
          pdf: false,
          mail: false,
          stock_receipt: true,
        }));
        break;
      case "Submitted":
        setSupplierBtn((prev) => ({
          ...prev,
          buttonAcs: true,
          cancel_order: false,
          draft: true,
          submit_po: true,
          pdf: false,
          mail: false,
          stock_receipt: false,
        }));
        break;
      case "Partially Received":
        setSupplierBtn((prev) => ({
          ...prev,
          buttonAcs: true,
          cancel_order: false,
          draft: true,
          submit_po: true,
          pdf: false,
          mail: false,
          stock_receipt: false,
        }));
        break;
      case "Received":
        setSupplierBtn((prev) => ({
          ...prev,
          buttonAcs: true,
          cancel_order: false,
          draft: true,
          submit_po: true,
          pdf: false,
          mail: false,
          stock_receipt: false,
        }));
        break;
      case "Cancelled":
        setSupplierBtn((prev) => ({
          ...prev,
          buttonAcs: true,
          cancel_order: true,
          draft: true,
          submit_po: true,
          pdf: false,
          mail: false,
          stock_receipt: true,
        }));
        break;
    }
  }, [SupplierStatus]);

  const handleSaveDraftState = (e) => {
    e.preventDefault();
    setSupplierStatus("Draft");
    toast.success("Supplier Item in Save Draft State");
  };
  const handleSubmittedInvoiceState = (e) => {
    e.preventDefault();
    setSupplierStatus("Submitted");
    toast.success("Supplier Item in Send State");
  };
  const handleCancelledState = (e) => {
    e.preventDefault();
    setSupplierStatus("Cancelled");
    toast.success("Supplier Item in Cancelled State");
  };
  console.log(SupplierInput);

  return (
    <>
      <div className="createNewSupplier-container">
        <form onSubmit={handleSubmittedInvoiceState}>
          <div className="createNewSupplier-head">
            <nav>
              <p>
                {SupplierStatus === ""
                  ? "New Supplier Order"
                  : "Supplier Order"}
              </p>
              {SupplierStatus !== "" && (
                <h3
                  className={
                    SupplierStatus === "Draft"
                      ? "createNewSupplier-Status-draft"
                      : SupplierStatus === "Submitted"
                      ? "createNewSupplier-Status-Submitted"
                      : SupplierStatus === "Cancelled"
                      ? "createNewSupplier-Status-Cancelled"
                      : SupplierStatus === "Partially Received"
                      ? "createNewSupplier-Status-PartiallyReceived"
                      : SupplierStatus === "Received"
                      ? "createNewSupplier-Status-Received"
                      : ""
                  }
                >
                  Status: {SupplierStatus}
                </h3>
              )}
            </nav>
            <div>
              <nav
                className="createNewSupplier-close"
                onClick={(e) => {
                  e.preventDefault();
                  prevpg(-1);
                }}
              >
                <svg
                  className="createNewSupplier-circle-x-logo"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" />
                </svg>
                <p>Close</p>
              </nav>
            </div>
          </div>
          <div className="createNewSupplier-input-container">
            <div className="createNewSupplier-input-box">
              <label htmlFor="po_id">Supplier ID {`(Auto Generate)`}<sup>*</sup></label>
              <input
                id="supplier_id"
                type="text"
                value={SupplierInput.po_id}
                onChange={handleSupplierInputChange}
                placeholder="Auto Generate"
                disabled
              />
            </div>
            <div className="createNewSupplier-input-box">
              <label htmlFor="po_id">Tax Identification Number(Tax ID/GST IN/VAT ID)<sup>*</sup></label>
              <input
                id="tin_id"
                type="text"
                value={SupplierInput.tin_id}
                onChange={handleSupplierInputChange}
                placeholder="Eg:ABCD17CD98D5678E"
                required
              />
            </div>
          </div>
          <div className="createNewSupplier-input-container">
            <div className="createNewSupplier-input-box">
              <label htmlFor="supplier_id">Supplier Name<sup>*</sup></label>
              <input
                id="supplier_id"
                type="text"
                value={SupplierInput.supplier_id}
                onChange={handleSupplierInputChange}
                placeholder="Eg: ABC Industrial Supplies Private Limited"
              />
            </div>
            <div className="createNewSupplier-input-box">
              <label htmlFor="po_id">Company Registration Number<sup>*</sup></label>
              <input
                id="tin_id"
                type="text"
                value={SupplierInput.tin_id}
                onChange={handleSupplierInputChange}
                placeholder="Eg: CIN:U23DRE456YUOU98"
              />
            </div>
          </div>
          <div className="createNewSupplier-input-container">
            <div className="createNewSupplier-input-box">
              <label htmlFor="supplier_name">Legal Entity Name<sup>*</sup></label>
              <input
                id="supplier_name"
                value={SupplierInput.supplier_name}
                onChange={handleSupplierInputChange}
                type="text"
                placeholder="Eg: ABC Industrial Supplies Private Limited"
                disabled={SupplierBtn.buttonAcs}
              />
            </div>
            <div className="createNewSupplier-input-box">
              <label htmlFor="country_id">
                Country of Registration<sup>*</sup>
              </label>
              <select
                id="supplier_id"
                value={SupplierInput.supplier_id}
                onChange={handleSupplierInputChange}
                disabled={SupplierBtn.buttonAcs}
                required
              >
                <option>Select Country</option>
                {SupplierData &&
                  SupplierData.length > 0 &&
                  SupplierData.map((ele, ind) => (
                    <option key={ind} value={ele.supplier_id}>
                      {ele.supplier_id}
                    </option>
                  ))}
              </select>
            </div>
            
          </div>
           <div className="createNewSupplier-input-container">
             <div className="createNewSupplier-input-box">
              <label htmlFor="country_id">
                Supplier Type<sup>*</sup>
              </label>
              <select
                id="supplier_id"
                value={SupplierInput.supplier_id}
                onChange={handleSupplierInputChange}
                disabled={SupplierBtn.buttonAcs}
                required
              >
                <option>Select Supplier Type</option>
                {SupplierData &&
                  SupplierData.length > 0 &&
                  SupplierData.map((ele, ind) => (
                    <option key={ind} value={ele.supplier_id}>
                      {ele.supplier_id}
                    </option>
                  ))}
              </select>
            </div>
            <div className="createNewSupplier-input-box">
              <label htmlFor="country_id">
                Status<sup>*</sup>
              </label>
              <select
                id="supplier_id"
                value={SupplierInput.supplier_id}
                onChange={handleSupplierInputChange}
                disabled={SupplierBtn.buttonAcs}
                required
              >
                <option>Select Status</option>
                {SupplierData &&
                  SupplierData.length > 0 &&
                  SupplierData.map((ele, ind) => (
                    <option key={ind} value={ele.supplier_id}>
                      {ele.supplier_id}
                    </option>
                  ))}
              </select>
            </div>
            
          </div>
          <div className="createNewSupplier-input-container">
             <div className="createNewSupplier-input-box">
              <label htmlFor="country_id">
                Supplier Tier<sup>*</sup>
              </label>
              <select
                id="supplier_id"
                value={SupplierInput.supplier_id}
                onChange={handleSupplierInputChange}
                disabled={SupplierBtn.buttonAcs}
                required
              >
                <option>Select Tier</option>
                {SupplierData &&
                  SupplierData.length > 0 &&
                  SupplierData.map((ele, ind) => (
                    <option key={ind} value={ele.supplier_id}>
                      {ele.supplier_id}
                    </option>
                  ))}
              </select>
            </div>
            <div className="createNewSupplier-input-box">
              <label htmlFor="supplier_name">Product Details<sup>*</sup></label>
              <input
                id="supplier_name"
                value={SupplierInput.supplier_name}
                onChange={handleSupplierInputChange}
                type="text"
                placeholder="Enter Supplier Name"
                disabled={SupplierBtn.buttonAcs}
              />
            </div>
          </div>
          <nav className="createNewSupplier-subtit">Contact Information</nav>
          <div className="createNewSupplier-input-container">
             <div className="createNewSupplier-input-box">
              <label htmlFor="supplier_name">Primary Contact Name<sup>*</sup></label>
              <input
                id="supplier_name"
                value={SupplierInput.supplier_name}
                onChange={handleSupplierInputChange}
                type="text"
                placeholder="Enter First name"
                disabled={SupplierBtn.buttonAcs}
              />
            </div>
             <div className="createNewSupplier-input-box">
              <label htmlFor="supplier_name">Last Name<sup>*</sup></label>
              <input
                id="supplier_name"
                value={SupplierInput.supplier_name}
                onChange={handleSupplierInputChange}
                type="text"
                placeholder="Enter Last Name"
                disabled={SupplierBtn.buttonAcs}
              />
            </div>
          </div>
          <div className="createNewSupplier-input-container">
             <div className="createNewSupplier-input-box">
              <label htmlFor="supplier_name">Designation / Role<sup>*</sup></label>
              <input
                id="supplier_name"
                value={SupplierInput.supplier_name}
                onChange={handleSupplierInputChange}
                type="text"
                placeholder="Enter your Designation/Role"
                disabled={SupplierBtn.buttonAcs}
              />
            </div>
             <div className="createNewSupplier-input-box">
              <label htmlFor="supplier_name">Alternate Contact No<sup>*</sup></label>
              <input
                id="supplier_name"
                value={SupplierInput.supplier_name}
                onChange={handleSupplierInputChange}
                type="text"
                placeholder="+91 9988998823"
                disabled={SupplierBtn.buttonAcs}
              />
            </div>
          </div>
          <div className="createNewSupplier-input-container">
             <div className="createNewSupplier-input-box">
              <label htmlFor="supplier_name">Email<sup>*</sup></label>
              <input
                id="supplier_name"
                value={SupplierInput.supplier_name}
                onChange={handleSupplierInputChange}
                type="text"
                placeholder="Eg: pp@gmail.com"
                disabled={SupplierBtn.buttonAcs}
              />
            </div>
             <div className="createNewSupplier-input-box">
              <label htmlFor="supplier_name">Website<sup>*</sup></label>
              <input
                id="supplier_name"
                value={SupplierInput.supplier_name}
                onChange={handleSupplierInputChange}
                type="text"
                placeholder="Enter Website Name"
                disabled={SupplierBtn.buttonAcs}
              />
            </div>
          </div>
          <div className="createNewSupplier-input-container">
             <div className="createNewSupplier-input-box">
              <label htmlFor="supplier_name">Phone Number<sup>*</sup></label>
              <input
                id="supplier_name"
                value={SupplierInput.supplier_name}
                onChange={handleSupplierInputChange}
                type="text"
                placeholder="+91 9876545789"
                disabled={SupplierBtn.buttonAcs}
              />
            </div>
             <div className="createNewSupplier-input-box">
              <label htmlFor="supplier_name">Relationship Manager(Internal)<sup>*</sup></label>
              <input
                id="supplier_name"
                value={SupplierInput.supplier_name}
                onChange={handleSupplierInputChange}
                type="text"
                placeholder="Enter Manager Name"
                disabled={SupplierBtn.buttonAcs}
              />
            </div>
          </div>
          <nav className="createNewSupplier-subtit">Addresses</nav>
          <div className="createNewSupplier-input-container">
            <div className="createNewSupplier-input-box">
              <label htmlFor="sales_order_reference">
                Registered Office Address<sup>*</sup>
              </label>
              <input
                id="sales_order_reference"
                value={SupplierInput.sales_order_ref}
                onChange={handleSupplierInputChange}
                type="text"
                placeholder="Enter Office Address"
                disabled
              />
            </div>
          </div>
          <div className="createNewSupplier-input-container">
            <div className="createNewSupplier-input-box">
              <label htmlFor="sales_order_reference">
                Mailing Address<sup>*</sup>
              </label>
              <input
                id="sales_order_reference"
                value={SupplierInput.sales_order_ref}
                onChange={handleSupplierInputChange}
                type="text"
                placeholder="Enter mailing Address"
                disabled
              />
            </div>
          </div>
          <div className="createNewSupplier-input-container">
            <div className="createNewSupplier-input-box">
              <label htmlFor="sales_order_reference">
                Warehouse/Delivery Address<sup>*</sup>
            </label>
              <input
                id="sales_order_reference"
                value={SupplierInput.sales_order_ref}
                onChange={handleSupplierInputChange}
                type="text"
                placeholder="Enter Delivery Address"
                disabled
              />
            </div>
          </div>
          <div className="createNewSupplier-input-container">
            <div className="createNewSupplier-input-box">
              <label htmlFor="sales_order_reference">
                Billing Address<sup>*</sup>
              <sup>*</sup></label>
              <input
                id="sales_order_reference"
                value={SupplierInput.sales_order_ref}
                onChange={handleSupplierInputChange}
                type="text"
                placeholder="Enter Billing Address"
                disabled
              />
            </div>
          </div>
           <div className="createNewSupplier-input-container">
            <div className="createNewSupplier-input-box">
              <label htmlFor="country_id">
                Country of Registration<sup>*</sup>
              <sup>*</sup></label>
              <select
                id="supplier_id"
                value={SupplierInput.supplier_id}
                onChange={handleSupplierInputChange}
                disabled={SupplierBtn.buttonAcs}
                required
              >
                <option>Select Country</option>
                {SupplierData &&
                  SupplierData.length > 0 &&
                  SupplierData.map((ele, ind) => (
                    <option key={ind} value={ele.supplier_id}>
                      {ele.supplier_id}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <nav className="createNewSupplier-subtit">Banking & Payment Information</nav>
          <div className="createNewSupplier-input-container">
             <div className="createNewSupplier-input-box">
              <label htmlFor="supplier_name">Bank Name<sup>*</sup></label>
              <input
                id="supplier_name"
                value={SupplierInput.supplier_name}
                onChange={handleSupplierInputChange}
                type="text"
                placeholder="Enter Bank Name"
                disabled={SupplierBtn.buttonAcs}
              />
            </div>
             <div className="createNewSupplier-input-box">
              <label htmlFor="supplier_name">Payment Method<sup>*</sup></label>
              <input
                id="supplier_name"
                value={SupplierInput.supplier_name}
                onChange={handleSupplierInputChange}
                type="text"
                placeholder="Payment Method(ACH,Wire,Check,etc..)"
                disabled={SupplierBtn.buttonAcs}
              />
            </div>
          </div>
          <div className="createNewSupplier-input-container">
             <div className="createNewSupplier-input-box">
              <label htmlFor="supplier_name">Bank Account No<sup>*</sup></label>
              <input
                id="supplier_name"
                value={SupplierInput.supplier_name}
                onChange={handleSupplierInputChange}
                type="text"
                placeholder="Enter Bank Account Number"
                disabled={SupplierBtn.buttonAcs}
              />
            </div>
               <div className="createNewInvoice-input-box">
              <label htmlFor="payment_terms">
                Payment Terms<sup>*</sup>
              </label>
              <select
                id="payment_terms"
                value={SupplierInput.payment_terms}
                onChange={handleSupplierInputChange}
                required
                disabled={SupplierBtn.buttonAcs}
              >
                <option value="">Select Payment</option>
                <option value="Net 15">Net 15</option>
                <option value="Net 30">Net 30</option>
                <option value="Net 45">Net 45</option>
                <option value="Due on Receipt">Due on Receipt</option>
              </select>
            </div>
          </div>
          <div className="createNewSupplier-input-container">
             <div className="createNewSupplier-input-box">
              <label htmlFor="supplier_name">IBAN/SWIFT Code<sup>*</sup></label>
              <input
                id="supplier_name"
                value={SupplierInput.supplier_name}
                onChange={handleSupplierInputChange}
                type="text"
                placeholder="Enter IBAN/SWIFT code"
                disabled={SupplierBtn.buttonAcs}
              />
            </div>
             <div className="createNewSupplier-input-box">
              <label htmlFor="supplier_name">Tax Withholding Setup<sup>*</sup></label>
              <input
                id="supplier_name"
                value={SupplierInput.supplier_name}
                onChange={handleSupplierInputChange}
                type="text"
                placeholder="Tax Withholding Setup"
                disabled={SupplierBtn.buttonAcs}
              />
            </div>
          </div>
          <div className="createNewSupplier-input-container">
             <div className="createNewSupplier-input-box">
               <label htmlFor="currency">
                Currency<sup>*</sup>
              </label>
              <select
                id="currency"
                value={SupplierInput.currency}
                onChange={handleSupplierInputChange}
                required
                disabled={SupplierBtn.BtnAccess}
              >
                <option value="">Select Currency</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="IND">IND</option>
                <option value="GBP">GBP</option>
                <option value="SGD">SGD</option>
              </select>
            </div>
          </div>
          <nav className="createNewSupplier-subtit">Procurement & Operational Data</nav>
          <div className="createNewSupplier-input-container">
             <div className="createNewSupplier-input-box">
              <label htmlFor="supplier_name">Categories Served<sup>*</sup></label>
              <input
                id="supplier_name"
                value={SupplierInput.supplier_name}
                onChange={handleSupplierInputChange}
                type="text"
                placeholder="Eg: Goods/Services"
                disabled={SupplierBtn.buttonAcs}
              />
            </div>
             <div className="createNewSupplier-input-box">
              <label htmlFor="supplier_name">Inco Terms<sup>*</sup></label>
              <input
                id="supplier_name"
                value={SupplierInput.supplier_name}
                onChange={handleSupplierInputChange}
                type="text"
                placeholder="Eg: FOB,CIF,CIP"
                disabled={SupplierBtn.buttonAcs}
              />
            </div>
          </div>
          <div className="createNewSupplier-input-container">
             <div className="createNewSupplier-input-box">
              <label htmlFor="supplier_name">Product/Service Catalog<sup>*</sup></label>
              <input
                id="supplier_name"
                value={SupplierInput.supplier_name}
                onChange={handleSupplierInputChange}
                type="text"
                placeholder="Product/Service Catalog"
                disabled={SupplierBtn.buttonAcs}
              />
            </div>
             <div className="createNewSupplier-input-box">
              <label htmlFor="supplier_name">Freight Items<sup>*</sup></label>
              <input
                id="supplier_name"
                value={SupplierInput.supplier_name}
                onChange={handleSupplierInputChange}
                type="text"
                placeholder="FOB origin / DDP"
                disabled={SupplierBtn.buttonAcs}
              />
            </div>
          </div>
          <div className="createNewSupplier-input-container">
             <div className="createNewSupplier-input-box">
              <label htmlFor="supplier_name">Minimum order Quantity<sup>*</sup></label>
              <input
                id="supplier_name"
                value={SupplierInput.supplier_name}
                onChange={handleSupplierInputChange}
                type="text"
                placeholder="Eg: 1/5/10 units"
                disabled={SupplierBtn.buttonAcs}
              />
            </div>
             <div className="createNewSupplier-input-box">
              <label htmlFor="supplier_name">Return & Replacement Policy<sup>*</sup></label>
              <input
                id="supplier_name"
                value={SupplierInput.supplier_name}
                onChange={handleSupplierInputChange}
                type="text"
                placeholder="Return accepted within 10 days of delivery"
                disabled={SupplierBtn.buttonAcs}
              />
            </div>
          </div>
          <div className="createNewSupplier-input-container">
             <div className="createNewSupplier-input-box">
              <label htmlFor="supplier_name">Average Time (Days)<sup>*</sup></label>
              <input
                id="supplier_name"
                value={SupplierInput.supplier_name}
                onChange={handleSupplierInputChange}
                type="text"
                placeholder="Eg : 1-3 days or 4-7 days"
                disabled={SupplierBtn.buttonAcs}
              />
            </div>
             <div className="createNewSupplier-input-box">
              <label htmlFor="supplier_name">Contract References<sup>*</sup></label>
              <input
                id="supplier_name"
                value={SupplierInput.supplier_name}
                onChange={handleSupplierInputChange}
                type="text"
                placeholder="Contract References"
                disabled={SupplierBtn.buttonAcs}
              />
            </div>
          </div>
          <nav className="createNewSupplier-subtit">Compliance & Risk Management</nav>
          <div className="createNewSupplier-input-container">
             <div className="createNewSupplier-input-box">
              <label htmlFor="supplier_name">Certifications<sup>*</sup></label>
              <input
                id="supplier_name"
                value={SupplierInput.supplier_name}
                onChange={handleSupplierInputChange}
                type="text"
                placeholder="Certifications (ISO 9001)"
                disabled={SupplierBtn.buttonAcs}
              />
            </div>
             <div className="createNewSupplier-input-box">
              <label htmlFor="supplier_name">Risk Notes/Flags<sup>*</sup></label>
              <input
                id="supplier_name"
                value={SupplierInput.supplier_name}
                onChange={handleSupplierInputChange}
                type="text"
                placeholder="Enter risk details or observations"
                disabled={SupplierBtn.buttonAcs}
              />
            </div>
          </div>
          <div className="createNewSupplier-input-container">
             <div className="createNewSupplier-input-box">
              <label htmlFor="supplier_name">Compliance Status<sup>*</sup></label>
              <input
                id="supplier_name"
                value={SupplierInput.supplier_name}
                onChange={handleSupplierInputChange}
                type="text"
                placeholder="Compliance Status"
                disabled={SupplierBtn.buttonAcs}
              />
            </div>
             <div className="createNewSupplier-input-box">
              <label htmlFor="supplier_name">Last Risk Assessment Date<sup>*</sup></label>
              <input
                id="supplier_name"
                value={SupplierInput.supplier_name}
                onChange={handleSupplierInputChange}
                type="text"
                placeholder="DD/MM/YYYY"
                disabled={SupplierBtn.buttonAcs}
              />
            </div>
          </div>
          <div className="createNewSupplier-input-container">
             <div className="createNewSupplier-input-box">
              <label htmlFor="supplier_name">Insurance Documents/Info<sup>*</sup></label>
              <input
                id="supplier_name"
                value={SupplierInput.supplier_name}
                onChange={handleSupplierInputChange}
                type="text"
                placeholder="PDF or Document Link"
                disabled={SupplierBtn.buttonAcs}
              />
            </div>
             <div className="createNewSupplier-input-box">
              <label htmlFor="supplier_name">Migration Plans<sup>*</sup></label>
              <input
                id="supplier_name"
                value={SupplierInput.supplier_name}
                onChange={handleSupplierInputChange}
                type="text"
                placeholder="Migration Plans"
                disabled={SupplierBtn.buttonAcs}
              />
            </div>
          </div>
          <div className="createNewSupplier-input-container">
             <div className="createNewSupplier-input-box">
              <label htmlFor="supplier_name">Risk Ratings<sup>*</sup></label>
              <input
                id="supplier_name"
                value={SupplierInput.supplier_name}
                onChange={handleSupplierInputChange}
                type="text"
                placeholder="Enter risk ratings"
                disabled={SupplierBtn.buttonAcs}
              />
            </div>
          </div>
           <nav className="createNewSupplier-subtit">Performance & Evaluation</nav>
          <div className="createNewSupplier-input-container">
             <div className="createNewSupplier-input-box">
              <label htmlFor="supplier_name">On-Time Delivery Rate(%)<sup>*</sup></label>
              <input
                id="supplier_name"
                value={SupplierInput.supplier_name}
                onChange={handleSupplierInputChange}
                type="text"
                placeholder="Eg: 98.5%"
                disabled={SupplierBtn.buttonAcs}
              />
            </div>
             <div className="createNewSupplier-input-box">
              <label htmlFor="supplier_name">Quality Ratings(1-5 stars/ % Score)<sup>*</sup></label>
              <input
                id="supplier_name"
                value={SupplierInput.supplier_name}
                onChange={handleSupplierInputChange}
                type="text"
                placeholder="Eg : 4.2/5 stars / 92%"
                disabled={SupplierBtn.buttonAcs}
              />
            </div>
          </div>
          <div className="createNewSupplier-input-container">
             <div className="createNewSupplier-input-box">
              <label htmlFor="supplier_name">Defect/Return Rate(%)<sup>*</sup></label>
              <input
                id="supplier_name"
                value={SupplierInput.supplier_name}
                onChange={handleSupplierInputChange}
                type="text"
                placeholder="Eg:1.2%"
                disabled={SupplierBtn.buttonAcs}
              />
            </div>
             <div className="createNewSupplier-input-box">
              <label htmlFor="supplier_name">Last Evaluation Date<sup>*</sup></label>
              <input
                id="supplier_name"
                value={SupplierInput.supplier_name}
                onChange={handleSupplierInputChange}
                type="text"
                placeholder="Eg: 2025-09-20"
                disabled={SupplierBtn.buttonAcs}
              />
            </div>
          </div>
          <div className="createNewSupplier-input-container">
             <div className="createNewSupplier-input-box">
              <label htmlFor="supplier_name">Contract Breaches(Y/N)<sup>*</sup></label>
              <input
                id="supplier_name"
                value={SupplierInput.supplier_name}
                onChange={handleSupplierInputChange}
                type="text"
                placeholder="Eg: N(No breaches) or Y(2025-09-28)"
                disabled={SupplierBtn.buttonAcs}
              />
            </div>
             <div className="createNewSupplier-input-box">
              <label htmlFor="supplier_name">Improvement Plans<sup>*</sup></label>
              <input
                id="supplier_name"
                value={SupplierInput.supplier_name}
                onChange={handleSupplierInputChange}
                type="text"
                placeholder="Eg: Action:review packaging to reduce damage"
                disabled={SupplierBtn.buttonAcs}
              />
            </div>
          </div>
          <div className="createNewSupplier-input-container">
             <div className="createNewSupplier-input-box">
              <label htmlFor="supplier_name">Compliants Registered<sup>*</sup></label>
              <input
                id="supplier_name"
                value={SupplierInput.supplier_name}
                onChange={handleSupplierInputChange}
                type="text"
                placeholder="Enter Total Complaints"
                disabled={SupplierBtn.buttonAcs}
              />
            </div>
          </div>
          <nav className="createNewSupplier-subtit">Relationship & Communication History</nav>
          <div className="createNewSupplier-input-container">
             <div className="createNewSupplier-input-box">
              <label htmlFor="supplier_name">External Key Contact<sup>*</sup></label>
              <input
                id="supplier_name"
                value={SupplierInput.supplier_name}
                onChange={handleSupplierInputChange}
                type="text"
                placeholder="Primary contact name/Title"
                disabled={SupplierBtn.buttonAcs}
              />
            </div>
             <div className="createNewSupplier-input-box">
              <label htmlFor="supplier_name">Dispute Resolutions<sup>*</sup></label>
              <input
                id="supplier_name"
                value={SupplierInput.supplier_name}
                onChange={handleSupplierInputChange}
                type="text"
                placeholder="Attach documnets to Past disputes and resolutions"
                disabled={SupplierBtn.buttonAcs}
              />
            </div>
          </div>
          <div className="createNewSupplier-input-container">
             <div className="createNewSupplier-input-box">
              <label htmlFor="supplier_name">Interaction Logs(Link to CRM logs)<sup>*</sup></label>
              <input
                id="supplier_name"
                value={SupplierInput.supplier_name}
                onChange={handleSupplierInputChange}
                type="text"
                placeholder="Attach or link record of calls / emails"
                disabled={SupplierBtn.buttonAcs}
              />
            </div>
             <div className="createNewSupplier-input-box">
              <label htmlFor="supplier_name">Feedback/Surveys<sup>*</sup></label>
              <input
                id="supplier_name"
                value={SupplierInput.supplier_name}
                onChange={handleSupplierInputChange}
                type="text"
                placeholder="Attach supplier performance survey results"
                disabled={SupplierBtn.buttonAcs}
              />
            </div>
          </div>
          <div className="createNewSupplier-input-container">
             <div className="createNewSupplier-input-box">
              <label htmlFor="supplier_name">Visit History/Meeting Notes<sup>*</sup></label>
              <input
                id="supplier_name"
                value={SupplierInput.supplier_name}
                onChange={handleSupplierInputChange}
                type="text"
                placeholder="Discuss last meeting date,discussion summary"
                disabled={SupplierBtn.buttonAcs}
              />
            </div>
          </div>
          <div className="createNewSupplier-hub-container">
            <div className="createNewSupplier-hub-head">
              <p
                className={
                  detail.comment
                    ? "createNewSupplier-hub-head-bg-black"
                    : "createNewSupplier-hub-head-tit"
                }
                onClick={() => {
                  setDetail({
                    history: false,
                    attachment: false,
                    comment: true,
                  });
                }}
              >
                Comments
              </p>
              <p
                className={
                  detail.history
                    ? "createNewSupplier-hub-head-bg-black"
                    : "createNewSupplier-hub-head-tit"
                }
                onClick={() => {
                  setDetail({
                    history: true,
                    attachment: false,
                    comment: false,
                  });
                }}
              >
                History
              </p>
              <p
                className={
                  detail.attachment
                    ? "createNewSupplier-hub-head-bg-black"
                    : "createNewSupplier-hub-head-tit"
                }
                onClick={() => {
                  setDetail({
                    history: false,
                    attachment: true,
                    comment: false,
                  });
                }}
              >
                Attachments
              </p>
            </div>
            <div className="createNewSupplier-hub-body">
              {detail.comment && <SupplierComment />}
              {detail.history && <SupplierHistory />}
              {detail.attachment && (
                <SupplierAttachment inputDisable={SupplierBtn.buttonAcs} />
              )}
            </div>
          </div>
          <div className="createNewSupplier-btn-container">
            <button
              className={
                SupplierStatus === "Submitted" || SupplierStatus === "Cancelled"
                  ? "createNewSupplier-order-active-btn"
                  : "createNewSupplier-inactive-btn"
              }
              onClick={handleCancelledState}
              disabled={SupplierBtn.cancel_order}
            >
              {SupplierStatus === "Cancelled" ? "Cancel Order" : "Delete SP"}
            </button>
            <nav>
              <button
                className="createNewSupplier-cancel-btn"
                onClick={(e) => {
                  e.preventDefault();
                  prevpg(-1);
                }}
              >
                Cancel
              </button>
              <button
                className={
                  SupplierStatus === "" || SupplierStatus === "Draft"
                    ? "createNewSupplier-active-btn"
                    : "createNewSupplier-completed-btn"
                }
                onClick={handleSaveDraftState}
                disabled={SupplierBtn.draft}
              >
                Save Draft
              </button>
              <button
                className={
                  SupplierStatus === "" || SupplierStatus === "Draft"
                    ? "createNewSupplier-active-btn"
                    : "createNewSupplier-completed-btn"
                }
                disabled={SupplierBtn.submit_po}
              >
                {SupplierStatus === "Submitted" ? "Submitted PO" : "Submit PO"}
              </button>
              <svg
                className={
                  SupplierStatus !== ""
                    ? "createNewSupplier-pdf-mail-activelogo"
                    : "createNewSupplier-pdf-mail-futurelogo"
                }
                disabled={SupplierBtn.pdf}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 22 24"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0.600098 2.4C0.600098 1.76348 0.852954 1.15303 1.30304 0.702944C1.75313 0.252856 2.36358 0 3.0001 0L16.1313 0L21.4001 5.2688V21.6C21.4001 22.2365 21.1472 22.847 20.6972 23.2971C20.2471 23.7471 19.6366 24 19.0001 24H3.0001C2.36358 24 1.75313 23.7471 1.30304 23.2971C0.852954 22.847 0.600098 22.2365 0.600098 21.6V2.4ZM4.6001 9.6H2.2001V17.6H3.8001V14.4H4.6001C5.23662 14.4 5.84707 14.1471 6.29715 13.6971C6.74724 13.247 7.0001 12.6365 7.0001 12C7.0001 11.3635 6.74724 10.753 6.29715 10.3029C5.84707 9.85286 5.23662 9.6 4.6001 9.6ZM11.0001 9.6H8.6001V17.6H11.0001C11.6366 17.6 12.2471 17.3471 12.6972 16.8971C13.1472 16.447 13.4001 15.8365 13.4001 15.2V12C13.4001 11.3635 13.1472 10.753 12.6972 10.3029C12.2471 9.85286 11.6366 9.6 11.0001 9.6ZM15.0001 17.6V9.6H19.8001V11.2H16.6001V12.8H18.2001V14.4H16.6001V17.6H15.0001Z"
                />
              </svg>
              <svg
                className={
                  SupplierStatus !== ""
                    ? "createNewSupplier-pdf-mail-activelogo"
                    : "createNewSupplier-pdf-mail-futurelogo"
                }
                disabled={SupplierBtn.mail}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 16"
                fill="none"
              >
                <path d="M2 16C1.45 16 0.979333 15.8043 0.588 15.413C0.196667 15.0217 0.000666667 14.5507 0 14V2C0 1.45 0.196 0.979333 0.588 0.588C0.98 0.196666 1.45067 0.000666667 2 0H18C18.55 0 19.021 0.196 19.413 0.588C19.805 0.98 20.0007 1.45067 20 2V14C20 14.55 19.8043 15.021 19.413 15.413C19.0217 15.805 18.5507 16.0007 18 16H2ZM10 8.825C10.0833 8.825 10.171 8.81233 10.263 8.787C10.355 8.76167 10.4423 8.72433 10.525 8.675L17.6 4.25C17.7333 4.16667 17.8333 4.06267 17.9 3.938C17.9667 3.81333 18 3.67567 18 3.525C18 3.19167 17.8583 2.94167 17.575 2.775C17.2917 2.60833 17 2.61667 16.7 2.8L10 7L3.3 2.8C3 2.61667 2.70833 2.61267 2.425 2.788C2.14167 2.96333 2 3.209 2 3.525C2 3.69167 2.03333 3.83767 2.1 3.963C2.16667 4.08833 2.26667 4.184 2.4 4.25L9.475 8.675C9.55833 8.725 9.646 8.76267 9.738 8.788C9.83 8.81333 9.91733 8.82567 10 8.825Z" />
              </svg>
            </nav>
          </div>
        </form>
      </div>
    </>
  );
}
