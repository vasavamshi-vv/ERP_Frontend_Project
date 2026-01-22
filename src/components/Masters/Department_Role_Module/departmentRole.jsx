// import React, { useEffect, useState } from "react";
// import "./departmentRole.css";
// import CreateDepartmentRole from "./createDepartmentRole";
// import CreateNewRole from "./createNewRole";
// import useDepartmentStore from "./useDepartmentRoleStore";

// export default function DepartmentRole() {
//   const {
//     departments,
//     fetchDepartments,
//     deleteDepartment,
//     currentPage,
//     totalPages,
//     loading,
//     setSearch,
//   } = useDepartmentStore();

//   const [showNewRole, setShowNewRole] = useState(false);
//   const [editRoleOnly, setEditRoleOnly] = useState(false);
//   const [editRole, setEditRole] = useState({});

//   const [showDepartmentRole, setShowDepartmentRole] = useState(false);
//   const [editDepartmentRole, setEditDepartmentRole] = useState(false);
//   const [editDept, setEditDept] = useState({});

//   const [searchTerm, setSearchTerm] = useState("");

//   // Fetch departments on mount
//   useEffect(() => {
//     fetchDepartments();
//   }, [fetchDepartments]);

//   // Handle search
//   const handleSearch = (e) => {
//     const value = e.target.value;
//     setSearchTerm(value);
//     setSearch(value);
//     fetchDepartments(1, value); // always reset to page 1
//   };

//   const handleNext = () => {
//     if (currentPage < totalPages) fetchDepartments(currentPage + 1, searchTerm);
//   };

//   const handlePrev = () => {
//     if (currentPage > 1) fetchDepartments(currentPage - 1, searchTerm);
//   };

//   const showEditDepartmentRole = (code) => {
//     const departmentToEdit = departments.find((d) => d.code === code);
//     if (departmentToEdit) {
//       setEditDept(departmentToEdit);
//       setEditDepartmentRole(true);
//       setShowDepartmentRole(false);
//     }
//   };

//   const handleCloseModal = () => {
//     setEditDepartmentRole(false);
//     setShowDepartmentRole(false);
//     setEditDept({});
//   };

//   return (
//     <>
//       {showNewRole && (
//         <div className="createNewRole-btn">
//           <CreateNewRole
//             editRoleOnly={editRoleOnly}
//             setShowNewRole={setShowNewRole}
//             editRole={editRole}
//             setEditRole={setEditRole}
//             setEditRoleOnly={setEditRoleOnly}
//           />
//         </div>
//       )}

//       {(showDepartmentRole || editDepartmentRole) && (
//         <div className="create-department-role-btn">
//           <CreateDepartmentRole
//             setEditRole={setEditRole}
//             setEditRoleOnly={setEditRoleOnly}
//             editDept={editDept}
//             editDepartmentRole={editDepartmentRole}
//             setEditDept={setEditDept}
//             setShowDepartmentRole={setShowDepartmentRole}
//             setEditDepartmentRole={setEditDepartmentRole}
//             setShowNewRole={setShowNewRole}
//             setDepartmentTableData={null} // handled by store now
//             onClose={handleCloseModal}
//           />
//         </div>
//       )}

//       <div
//         className={`department-role-container ${
//           showDepartmentRole || editDepartmentRole ? "blur-department" : ""
//         }`}
//       >
//         <p>Department & Roles</p>

//         <div className="department-header">
//           <p className="department-headleft">
//             Efficiently manage and organize Department & Roles with ease.
//           </p>
//           <div className="department-headright">
//             <div className="department-search-cointainer">
//               <input
//                 placeholder="Search departments"
//                 value={searchTerm}
//                 onChange={handleSearch}
//               />
//             </div>
//             <button
//               onClick={() => {
//                 setShowDepartmentRole(true);
//                 setEditDepartmentRole(false);
//                 setEditDept({});
//               }}
//             >
//               + Create New Department
//             </button>
//           </div>
//         </div>

//         <div className="department-table-container">
//           <table>
//             <thead className="department-thead">
//               <tr>
//                  <th>S.No.</th>
//                 <th>Code</th>
//                 <th>Department Name</th>
//                 <th id="department-width-description">Description</th>
//                 <th id="department-width-action">Action</th>
//               </tr>
//             </thead>

//             <tbody className="department-tbody">
//               {!loading && departments.length > 0 ? (
//                 departments.map((dept,index) => (
//                   <tr key={dept.id}>
//                     <td>{index+1}</td>
//                     <td>{dept.code}</td>
//                     <td>{dept.department_name}</td>
//                     <td id="department-width-description">{dept.description}</td>
//                     <td id="department-width-action">
//                       <svg
//                         className="dot-logo-department"
//                         xmlns="http://www.w3.org/2000/svg"
//                         viewBox="0 0 128 512"
//                       >
//                         <path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z" />
//                       </svg>

//                       <nav className="department-dot-container">
//                         <div onClick={() => showEditDepartmentRole(dept.code)}>Edit</div>
//                         <div onClick={() => deleteDepartment(dept.id)}>Delete</div>
//                       </nav>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="4" style={{ textAlign: "center" }}>
//                     {loading ? "Loading..." : "No Data Found"}
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         <nav className="table-bottem-department">
//           <p className="num-entries-department">
//             Showing {departments.length} entries
//           </p>

//           <div className="department-control-box">
//             <button
//               className="department-btn"
//               onClick={handlePrev}
//               disabled={currentPage === 1}
//             >
//               Prev
//             </button>
//             <nav className="num-page-department">
//               Page {currentPage} of {totalPages}
//             </nav>
//             <button
//               className="department-btn"
//               onClick={handleNext}
//               disabled={currentPage === totalPages}
//             >
//               Next
//             </button>
//           </div>
//         </nav>
//       </div>
//     </>
//   );
// }
import React, { useEffect, useState } from "react";
import "./departmentRole.css";
import CreateDepartmentRole from "./createDepartmentRole";
import CreateNewRole from "./createNewRole";
import useDepartmentStore from "./useDepartmentRoleStore";
import { toast } from "react-toastify";

export default function DepartmentRole() {
  const {
    departments,
    fetchDepartments,
    deleteDepartment,
    currentPage,
    totalPages,
    loading,
    search,
    setSearch,
  } = useDepartmentStore();

  const [showDepartmentRole, setShowDepartmentRole] = useState(false);
  const [editDepartmentRole, setEditDepartmentRole] = useState(false);
  const [editDept, setEditDept] = useState({});

  const [showNewRole, setShowNewRole] = useState(false);
  const [editRoleOnly, setEditRoleOnly] = useState(false);
  const [editRole, setEditRole] = useState({});

  /* ==============================
     Fetch on mount
  ============================== */
  useEffect(() => {
    fetchDepartments();
  }, []);

  /* ==============================
     Pagination
  ============================== */
  const handleNext = () => {
    if (currentPage < totalPages) {
      fetchDepartments(currentPage + 1, search);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      fetchDepartments(currentPage - 1, search);
    }
  };

  /* ==============================
     Search
  ============================== */
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    fetchDepartments(1, value);
  };

  /* ==============================
     Edit Department
  ============================== */
  const showEditDepartment = (id) => {
    const dept = departments.find((d) => d.id === id);
    if (!dept) {
      toast.error("Department not found");
      return;
    }

    setEditDept(dept);
    setEditDepartmentRole(true);
    setShowDepartmentRole(false);
  };

  /* ==============================
     Close Modal (SINGLE SOURCE)
  ============================== */
  const closeModal = () => {
    setShowDepartmentRole(false);
    setEditDepartmentRole(false);
    setEditDept({});
  };

  /* ==============================
     UI
  ============================== */
  return (
    <>
      {/* CREATE / EDIT DEPARTMENT MODAL */}
      {(showDepartmentRole || editDepartmentRole) && (
        <CreateDepartmentRole
          showDepartmentRole={showDepartmentRole}
          editDepartmentRole={editDepartmentRole}
          editDept={editDept}
          setShowNewRole={setShowNewRole}
          setEditRoleOnly={setEditRoleOnly}
          setEditRole={setEditRole}
          onClose={closeModal}
        />
      )}

      {/* CREATE ROLE MODAL */}
      {showNewRole && (
        <CreateNewRole
          editRoleOnly={editRoleOnly}
          setShowNewRole={setShowNewRole}
          editRole={editRole}
          setEditRole={setEditRole}
          setEditRoleOnly={setEditRoleOnly}
        />
      )}

      {/* MAIN CONTENT */}
      <div
        className={`department-role-container ${
          showDepartmentRole || editDepartmentRole || showNewRole
            ? "blur-department"
            : ""
        }`}
      >
        <p>Department & Roles</p>

        {/* HEADER */}
        <div className="department-header">
          <p className="department-headleft">
            Efficiently manage and organize Department & Roles with ease.
          </p>

          <div className="department-headright">
            <div className="department-search-cointainer">
              <input
                value={search}
                onChange={handleSearch}
                placeholder="Search departments"
              />
            </div>

            <button
              onClick={() => {
                setShowDepartmentRole(true);
                setEditDepartmentRole(false);
                setEditDept({});
              }}
            >
              + Create New Department
            </button>
          </div>
        </div>

        {/* TABLE */}
        <div className="department-table-container">
          <table>
            <thead className="department-thead">
              <tr>
                <th>S.No.</th>
                <th>Code</th>
                <th>Department Name</th>
                <th id="department-width-description">Description</th>
                <th id="department-width-action">Action</th>
              </tr>
            </thead>

            <tbody className="department-tbody">
              {loading ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    Loading...
                  </td>
                </tr>
              ) : departments.length ? (
                departments.map((dept, index) => (
                  <tr key={dept.id}>
                    <td>{index + 1}</td>
                    <td>{dept.code}</td>
                    <td>{dept.department_name}</td>
                    <td id="department-width-description">
                      {dept.description || "—"}
                    </td>
                    <td id="department-width-action">
                      <svg
                        className="dot-logo-department"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 128 512"
                      >
                        <path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z" />
                      </svg>

                      <nav className="department-dot-container">
                        <div onClick={() => showEditDepartment(dept.id)}>
                          Edit
                        </div>
                        <div onClick={() => deleteDepartment(dept.id)}>
                          Delete
                        </div>
                      </nav>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    No Data Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <nav className="table-bottem-department">
          <p className="num-entries-department">
            Showing {departments.length} entries
          </p>

          <div className="department-control-box">
            <button
              className="department-btn"
              onClick={handlePrev}
              disabled={currentPage === 1}
            >
              Prev
            </button>

            <nav className="num-page-department">
              Page {currentPage} of {totalPages}
            </nav>

            <button
              className="department-btn"
              onClick={handleNext}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </nav>
      </div>
    </>
  );
}

