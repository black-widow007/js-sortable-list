// Grab html elements
const draggableList = document.getElementById('draggable-list');
const check = document.getElementById('check');

// Create array of richest women
const richestWomen = [
    'Oprah Winfrey',
    'Folorunsho Alakija',
    'Sheila Johnson',
    'Hajia Bola Shagaya',
    'Rihanna',
    'Ngina Kenyatta',
    'Beyoncé',
    'Wendy Appelbaum',
    'Janice Bryant Howroyd',
    'Serena Williams'
];

// Store listitems
const listItems = [];

let dragStartIndex;

createList();

//fuction to insert list items into DOM
function createList() {
    //spread operator makes copy
    [...richestWomen]
    // use map to take the array & return a random array
        .map(a => ({ value: a, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(a => a.value)
        //loops thru array
        .forEach((woman, index) => {
            const listItem = document.createElement('li');


            //sets element data attribute to the index number
            listItem.setAttribute('data-index', index);

            // create html elements
            listItem.innerHTML = `
                <span class="number">${index + 1}</span>
                <div class="draggable" draggable="true">
                    <p class="person-name">${woman}</p>
                    <i class="fas fa-grip-lines"></i>
                </div>
            `;

            listItems.push(listItem);
            // add to DOM
            draggableList.appendChild(listItem);

        });

        addEventListeners();
    
}

function dragStart() {
    // console.log('Event: ', 'dragstart');
    dragStartIndex = +this.closest('li').getAttribute('data-index');
}

function dragEnter() {
    // console.log('Event: ', 'dragenter');
    this.classList.add('over');
}

function dragLeave() {
    // console.log('Event: ', 'dragleave');
    this.classList.remove('over');
}
function dragOver(e) {
    // console.log('Event: ', 'dragover');
    e.preventDefault();
}
function dragDrop() {
    // console.log('Event: ', 'drop');
    const dragEndIndex = +this.getAttribute('data-index');
    swapItems(dragStartIndex, dragEndIndex);

    this.classList.remove('over');
}

// Swap list items that are drag and drop
function swapItems(fromIndex, toIndex) {
    const itemOne = listItems[fromIndex].querySelector('.draggable');
    const itemTwo = listItems[toIndex].querySelector('.draggable');

    listItems[fromIndex].appendChild(itemTwo);
    listItems[toIndex].appendChild(itemOne);
}

//check the order of list items
function checkOrder() {
    listItems.forEach((listItem, index) => {
        const personName = listItem.querySelector('.draggable').innerText.trim();

        if(personName !== richestWomen[index]) {
            listItem.classList.add('wrong');
        } else {
            listItem.classList.remove('wrong');
            listItem.classList.add('right');
        }
    });
}

function addEventListeners() {
    const draggables = document.querySelectorAll('.draggable');
    const dragListItems = document.querySelectorAll('.draggable-list li');
  
    draggables.forEach(draggable => {
      draggable.addEventListener('dragstart', dragStart);
    });
  
    dragListItems.forEach(item => {
      item.addEventListener('dragover', dragOver);
      item.addEventListener('drop', dragDrop);
      item.addEventListener('dragenter', dragEnter);
      item.addEventListener('dragleave', dragLeave);
    });
}

check.addEventListener('click', checkOrder);