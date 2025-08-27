// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Employee_search {
    address[] public admins;

    constructor(address[] memory _admins) {
        admins.push(msg.sender);
        for(uint i=0; i<_admins.length; i++)
            admins.push(_admins[i]);
    }

    modifier onlyAdmin() {
        bool admin = false;
        for(uint i=0; i<admins.length; i++)
        {
            if(msg.sender == admins[i])
            {
                admin = true;
                break;
            }
        }
        require(admin == true, "Access Denied");
        _;
    }

    struct Employee_detail {
        string name;
        string gender;
        string role;
        string date_of_joining;
        string email;
    }

    mapping(uint256 => Employee_detail) public Employee_details;
    mapping(uint => uint256) index;
    uint NumEmployee;

    modifier newID(uint256 _id)
    {
        bool NewID = true;
        for(uint i=0; i<NumEmployee;i++)
        {
            if(index[i] == _id)
            {
                NewID = false;
                break;
            }
        }
        require(NewID == true, "An employee is already registered with this ID.");
        _;
    }

    function issue(
        uint256 _id,
        string memory _name,
        string memory _gender,
        string memory _role,
        string memory _date_of_joining,
        string memory _email
    ) public onlyAdmin newID(_id){
        Employee_details[_id] = Employee_detail(_name, _gender, _role, _date_of_joining, _email);
        index[NumEmployee++] = _id;
    }
}