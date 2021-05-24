// User class : Reprsent a user
class User {
    constructor(firstName, lastName, age, email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.email = email;
    }
}

// UI class : Handle UI task
class UI {
    static displayUsers() {
        const storedUsers = [
            {
                firstName: 'Aravinthan',
                lastName: 'P',
                age: 23,
                email: 'aravinthan@gmail.com'
            },
            {
                firstName: 'Arun',
                lastName: 'S',
                age: 32,
                email: 'arun@gmail.com'
            },
            {
                firstName: 'Ravi',
                lastName: 'M',
                age: 28,
                email: 'ravi@gmail.com'
            }
        ];

        // const users = storedUsers;

        const users = Store.getUsers();
        users.forEach((user) => UI.addUserToList(user));
        UI.isUserTableEmpty();
    }

    static addUserToList(user) {
        const list = document.getElementById('user-list');

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.firstName}</td>
            <td>${user.lastName}</td>
            <td>${user.age}</td>
            <td>${user.email}</td>
            <td><a href="#" class="btn btn-danger delete">X</a></td>
        `;

        list.appendChild(row);
        UI.isUserTableEmpty();
    }

    static clearFeilds() {
        document.getElementById('firstName').value = '';
        document.getElementById('lastName').value = '';
        document.getElementById('age').value = '';
        document.getElementById('email').value = '';
    }

    static deleteUser(element) {
        if (element.classList.contains('delete')) {
            element.parentElement.parentElement.remove();
            UI.isUserTableEmpty();
        }
    }

    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.getElementById('container');
        const form = document.getElementById('user-form');
        container.insertBefore(div, form);

        // Vanish after 3 second
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }

    static isUserTableEmpty() {
        let users = JSON.parse(localStorage.getItem('users'));
        console.log(users);
        if (users.length === 0) {
            document.getElementById('user-table').style.visibility = "hidden";
            document.getElementById('no-user-table').style.visibility = "visible";
        }
        else {
            document.getElementById('user-table').style.visibility = "visible";
            document.getElementById('no-user-table').style.visibility = "hidden";
        }
    }
}

// Store class : Handle storage
class Store {
    static getUsers() {
        let users;
        if (localStorage.getItem('users') === null) {
            users = [];
        } else {
            users = JSON.parse(localStorage.getItem('users'));
        }
        return users;
    }

    static addUser(user) {
        const users = Store.getUsers();
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
    }

    static removeUser(removeUserFirstName) {
        const users = Store.getUsers();
        users.forEach((user, index) => {
            if (user.firstName === removeUserFirstName) {
                users.splice(index, 1);
            }
        });
        localStorage.setItem('users', JSON.stringify(users));
    }
}

// Event : Display Users
document.addEventListener('DOMContentLoaded', UI.displayUsers);


// Event : Add a User
document.getElementById('user-form')
    .addEventListener('submit', (e) => {
        e.preventDefault();
        // Get form values
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const age = document.getElementById('age').value;
        const email = document.getElementById('email').value;

        // Instatiate a user
        const user = new User(firstName, lastName, age, email);

        // Add user to Store
        Store.addUser(user);

        // Add User to UI
        UI.addUserToList(user);

        // Clear Feilds
        UI.clearFeilds();

        // USer added Alert
        UI.showAlert(`User added Sucessfully`, "success");
    })

// Event : Remove a USer
document.getElementById('user-list')
    .addEventListener('click', (e) => {

        // Delete user in store
        // console.log(e.target.parentElement.parentElement.children[0].textContent);
        var userFirstName = e.target.parentElement.parentElement.children[0].textContent;
        Store.removeUser(userFirstName)

        // Delete user in UI
        UI.deleteUser(e.target);

        // User deleted Alert
        UI.showAlert(`User deleted`, "info");

    })
