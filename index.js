function getAndUpdate() {
    console.log("Updating List....");
    tit = document.getElementById("title").value;
    desc = document.getElementById("description").value;
    if (localStorage.getItem("itemJson") == null) {
      itemJsonArray = [];
      itemJsonArray.push([tit, desc]);
      localStorage.setItem("itemJson", JSON.stringify(itemJsonArray));
    } else {
      itemJsonArrayStr = localStorage.getItem("itemJson");
      itemJsonArray = JSON.parse(itemJsonArrayStr);
      itemJsonArray.push([tit, desc]);
      localStorage.setItem("itemJson", JSON.stringify(itemJsonArray));
    }
    update();
  }

  function update() {
    if (localStorage.getItem("itemJson") == null) {
      itemJsonArray = [];
      localStorage.setItem("itemJson", JSON.stringify(itemJsonArray));
    } else {
      itemJsonArrayStr = localStorage.getItem("itemJson");
      itemJsonArray = JSON.parse(itemJsonArrayStr);
    }

    // Populate the table
    let tbody = document.getElementById("tablebody");
    let str = "";
    itemJsonArray.forEach((element, index) => {
      str += `
            <tr>
                <th scope="row">${index + 1}</th>
                <td>${element[0]}</td>
                <td>${element[1]}</td>
                <td><button class="btn btn-primary " onclick="deleted(${index})">Delete</button> </td>
              </tr>`;
    });
    tbody.innerHTML = str;
  }
  add = document.getElementById("add");
  add.addEventListener("click", getAndUpdate);
  update();

  function deleted(itemIndex) {
    console.log("Delete", itemIndex);
    itemJsonArrayStr = localStorage.getItem("itemJson");
    itemJsonArray = JSON.parse(itemJsonArrayStr);
    // Delete itemIndex element from the Array
    itemJsonArray.splice(itemIndex, 1);
    localStorage.setItem("itemJson", JSON.stringify(itemJsonArray));
    update();
  }
  function claearStorage() {
    if (confirm("Do you really want to clear ?")) {
      console.log("clearing the storage");
      localStorage.clear();
      update();
    }
  }