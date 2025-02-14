// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract HospitalManagement {
    enum Role {
        PATIENT,
        DOCTOR,
        ADMIN,
        HOSPITAL_ADMIN
    }

    struct User {
        string id;
        string name;
        string email;
        string phone;
        string profilePic;
        Role role;
        bool exists;
    }

    struct Hospital {
        string id;
        string name;
        string addresss;
        string phone;
        uint256 totalBeds;
        uint256 availableBeds;
        uint256 icuBeds;
        uint256 ventilators;
        bool exists;
    }

    struct Doctor {
        string id;
        string name;
        string specialization;
        string hospitalId;
        uint256 experience;
        bool availability;
        bool exists;
    }

    struct Patient {
        string id;
        string name;
        string bloodType;
        string allergy;
        string surgery;
        string medicalIssue;
        string emergencyContact;
        bool exists;
    }

    // Mappings for storing data
    mapping(address => User) public users;
    mapping(string => Hospital) public hospitals;
    mapping(string => Doctor) public doctors;
    mapping(string => Patient) public patients;

    // Events
    event UserRegistered(address indexed userAddress, string userId, Role role);
    event HospitalRegistered(string hospitalId, string name);
    event DoctorRegistered(string doctorId, string name, string specialization);
    event PatientRegistered(string patientId, string name);
    event HospitalUpdated(string hospitalId, string name, uint256 availableBeds);
    event UserRoleUpdated(address indexed userAddress, Role newRole);

    // Modifiers
    modifier onlyAdmin() {
        require(users[msg.sender].role == Role.ADMIN, "Only admin can perform this action");
        _;
    }

    modifier onlyHospitalAdmin() {
        require(
            users[msg.sender].role == Role.HOSPITAL_ADMIN || users[msg.sender].role == Role.ADMIN,
            "Only hospital admin or admin can perform this action"
        );
        _;
    }

    modifier userExists() {
        require(users[msg.sender].exists, "User does not exist");
        _;
    }

    // User Registration
    function registerUser(
        string memory _id,
        string memory _name,
        string memory _email,
        string memory _phone,
        string memory _profilePic,
        Role _role
    ) public {
        require(!users[msg.sender].exists, "User already registered");
        users[msg.sender] = User(_id, _name, _email, _phone, _profilePic, _role, true);
        emit UserRegistered(msg.sender, _id, _role);
    }

    // Register Hospital
    function registerHospital(
        string memory _id,
        string memory _name,
        string memory _address,
        string memory _phone,
        uint256 _totalBeds,
        uint256 _icuBeds,
        uint256 _ventilators
    ) public onlyHospitalAdmin {
        require(!hospitals[_id].exists, "Hospital already registered");
        hospitals[_id] = Hospital(
            _id,
            _name,
            _address,
            _phone,
            _totalBeds,
            _totalBeds,
            _icuBeds,
            _ventilators,
            true
        );
        emit HospitalRegistered(_id, _name);
    }

    // Register Doctor
    function registerDoctor(
        string memory _id,
        string memory _name,
        string memory _specialization,
        string memory _hospitalId,
        uint256 _experience
    ) public onlyHospitalAdmin {
        require(!doctors[_id].exists, "Doctor already registered");
        require(hospitals[_hospitalId].exists, "Hospital does not exist");
        doctors[_id] = Doctor(_id, _name, _specialization, _hospitalId, _experience, true, true);
        emit DoctorRegistered(_id, _name, _specialization);
    }

    // Register Patient
    function registerPatient(
        string memory _id,
        string memory _name,
        string memory _bloodType,
        string memory _allergy,
        string memory _surgery,
        string memory _medicalIssue,
        string memory _emergencyContact
    ) public {
        require(users[msg.sender].role == Role.PATIENT, "Only patients can register");
        require(!patients[_id].exists, "Patient already registered");
        patients[_id] = Patient(
            _id,
            _name,
            _bloodType,
            _allergy,
            _surgery,
            _medicalIssue,
            _emergencyContact,
            true
        );
        emit PatientRegistered(_id, _name);
    }

    // Update Hospital Data
    function updateHospital(
        string memory _id,
        uint256 _availableBeds
    ) public onlyHospitalAdmin {
        require(hospitals[_id].exists, "Hospital does not exist");
        hospitals[_id].availableBeds = _availableBeds;
        emit HospitalUpdated(_id, hospitals[_id].name, _availableBeds);
    }

    // Update User Role
    function updateUserRole(address _userAddress, Role _newRole) public onlyAdmin {
        require(users[_userAddress].exists, "User does not exist");
        users[_userAddress].role = _newRole;
        emit UserRoleUpdated(_userAddress, _newRole);
    }

    // Get Hospital Info
    function getHospital(string memory _id) public view returns (Hospital memory) {
        require(hospitals[_id].exists, "Hospital does not exist");
        return hospitals[_id];
    }

    // Get Doctor Info
    function getDoctor(string memory _id) public view returns (Doctor memory) {
        require(doctors[_id].exists, "Doctor does not exist");
        return doctors[_id];
    }

    // Get Patient Info
    function getPatient(string memory _id) public view returns (Patient memory) {
        require(patients[_id].exists, "Patient does not exist");
        return patients[_id];
    }

    // Get User Info
    function getUser(address _userAddress) public view returns (User memory) {
        require(users[_userAddress].exists, "User does not exist");
        return users[_userAddress];
    }
}
