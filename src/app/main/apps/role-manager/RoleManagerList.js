import { motion } from "framer-motion";
import FuseUtils from "@fuse/utils";
import Avatar from "@mui/material/Avatar";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useMemo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContactsMultiSelectMenu from "./ContactsMultiSelectMenu";
import RoleManagerTable from "./RoleManagerTable";

import {
    openEditContactDialog,
    removeContact,
    selectContacts,
} from "./store/contactsSlice";

function RoleManagerList(props) {
    const dispatch = useDispatch();
    const contacts = useSelector(selectContacts);
    const searchText = useSelector(
        ({ contactsApp }) => contactsApp.contacts.searchText
    );
    const user = useSelector(({ contactsApp }) => contactsApp.user);

    const [filteredData, setFilteredData] = useState(null);

    const columns = useMemo(
        () => [
            {
                Header: "Role Name",
                accessor: "name",
                className: "font-medium",
                sortable: true,
            },
            {
                Header: "Active",
                accessor: "active",
                id: "active",
                width: 128,
                sortable: true,
                Cell: ({ row }) => {
                    return (
                        <div className="flex items-center">
                            {row.original.active == "yes" ? (
                                <Icon className="text-green text-20">
                                    check_circle
                                </Icon>
                            ) : (
                                <Icon className="text-red text-20">
                                    remove_circle
                                </Icon>
                            )}
                        </div>
                    );
                },
            },
            {
                id: "action",
                width: 128,
                sortable: false,
                Cell: ({ row }) =>
                    row.original.name === "Super Admin" ||
                    row.original.name === "Sudo Admin" ? (
                        <div className="flex items-center">
                            <IconButton size="large">
                                <Icon>person_add_disabled</Icon>
                            </IconButton>
                        </div>
                    ) : (
                        <div className="flex items-center">
                            <IconButton
                                onClick={(ev) => {
                                    ev.stopPropagation();
                                    dispatch(removeContact(row.original.id));
                                }}
                                size="large"
                            >
                                <Icon>delete</Icon>
                            </IconButton>
                        </div>
                    ),
            },
        ]
        // [dispatch, user.starred]
    );

    useEffect(() => {
        function getFilteredArray(entities, _searchText) {
            if (_searchText.length === 0) {
                return contacts;
            }
            return FuseUtils.filterArrayByString(contacts, _searchText);
        }

        if (contacts) {
            setFilteredData(getFilteredArray(contacts, searchText));
        }
    }, [contacts, searchText]);

    if (!filteredData) {
        return null;
    }

    if (filteredData.length === 0) {
        return (
            <div className="flex flex-1 items-center justify-center h-full">
                <Typography color="textSecondary" variant="h5">
                    There are no roles!
                </Typography>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
            className="flex flex-auto w-full max-h-full"
        >
            <RoleManagerTable
                columns={columns}
                data={filteredData}
                onRowClick={(ev, row) => {
                    if (
                        row.original.name === "Super Admin" ||
                        row.original.name === "Sudo Admin"
                    ) {
                    } else {
                        dispatch(openEditContactDialog(row.original));
                    }
                }}
            />
        </motion.div>
    );
}

export default RoleManagerList;
