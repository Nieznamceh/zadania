const orders = [
    {
        id: "#1001",
        customer: "Anna Nowak",
        product: "Laptop Lenovo",
        date: "23.09.2026",
        amount: 4299,
        status: "Zrealizowane"
    },
    {
        id: "#1002",
        customer: "Piotr Kowalski",
        product: "Monitor Samsung",
        date: "22.09.2026",
        amount: 1299,
        status: "W realizacji"
    },
    {
        id: "#1003",
        customer: "Karolina Wójcik",
        product: "Klawiatura Logitech",
        date: "22.09.2026",
        amount: 349,
        status: "Oczekujące"
    },
    {
        id: "#1004",
        customer: "Michał Zieliński",
        product: "Mysz bezprzewodowa",
        date: "21.09.2026",
        amount: 199,
        status: "Zrealizowane"
    },
    {
        id: "#1005",
        customer: "Natalia Lewandowska",
        product: "Słuchawki Sony",
        date: "20.09.2026",
        amount: 799,
        status: "Anulowane"
    },
    {
        id: "#1006",
        customer: "Tomasz Wiśniewski",
        product: "Tablet Samsung",
        date: "19.09.2026",
        amount: 1899,
        status: "W realizacji"
    },
    {
        id: "#1007",
        customer: "Julia Kamińska",
        product: "Smartwatch Xiaomi",
        date: "18.09.2026",
        amount: 599,
        status: "Oczekujące"
    }
];
window.onload = function() {
    const ordersTable = document.querySelector("#ordersTable");
    const searchInput = document.querySelector("#searchInput");
    const statusFilter = document.querySelector("#statusFilter");
    const emptyMessage = document.querySelector("#emptyMessage");
    const ordersCount = document.querySelector("#ordersCount");
    const revenue = document.querySelector("#revenue");
    const customersCount = document.querySelector("#customersCount");
    const pendingCount = document.querySelector("#pendingCount");
    const statusClasses = {
        "Zrealizowane": "completed",
        "W realizacji": "progress",
        "Oczekujące": "pending",
        "Anulowane": "cancelled"
    };
    function renderOrders(list) {
        ordersTable.innerHTML = "";

        list.forEach(order => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${order.id}</td>
                <td>${order.customer}</td>
                <td>${order.product}</td>
                <td>${order.date}</td>
                <td>${order.amount.toLocaleString("pl-PL")} zł</td>
                <td>
                    <span class="status ${statusClasses[order.status]}">
                        ${order.status}
                    </span>
                </td>
`;
            ordersTable.appendChild(row);
        });
        emptyMessage.style.display = list.length === 0 ? "block" : "none";
    }
    function updateStatistics() {
        const totalRevenue = orders.reduce((sum, order) => {
            return sum + order.amount;
        }, 0);
        const uniqueCustomers = new Set(
            orders.map(order => order.customer)
        );
        const pendingOrders = orders.filter(order => {
            return order.status === "Oczekujące";
        });
        ordersCount.textContent = orders.length;
        revenue.textContent = `${totalRevenue.toLocaleString("pl-PL")} zł`;
        customersCount.textContent = uniqueCustomers.size;
        pendingCount.textContent = pendingOrders.length;
    }
    function filterOrders() {
        const searchValue = searchInput.value.toLowerCase().trim();
        const selectedStatus = statusFilter.value;
        const filteredOrders = orders.filter(order => {
            const matchesSearch =
                order.id.toLowerCase().includes(searchValue) ||
                order.customer.toLowerCase().includes(searchValue) ||
                order.product.toLowerCase().includes(searchValue);
            const matchesStatus =
                selectedStatus === "all" ||
                order.status === selectedStatus;
            return matchesSearch && matchesStatus;
        });
        renderOrders(filteredOrders);
    }
    searchInput.addEventListener("input", filterOrders);
    statusFilter.addEventListener("change", filterOrders);
    renderOrders(orders);
    updateStatistics();
};
