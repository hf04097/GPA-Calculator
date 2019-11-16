//Helper Function To Deal with DOM options and Return Select element with options of the iterable parameter
Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
}
NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for(var i = this.length - 1; i >= 0; i--) {
        if(this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
}


var courseAddBtn = document.getElementById('addCourseBtn');
var removeCourseBtn = document.getElementById('removeCourseBtn');
var calculateBtn = document.getElementById('calculateBtn');


function createOptions(array) {
    var select = document.createElement('select')
    for (var i = 0; i < array.length; i++) {
        var option = document.createElement('option')
        var text = document.createTextNode(array[i])
        option.appendChild(text)
        select.appendChild(option)
    }
    return select
}

var semester = {
    gradeValues: ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "F"],
    creditValues: [1, 2, 3, 4],
    gpaValues: {
        "A+": 4, "A": 4, "A-": 3.67, "B+": 3.33, "B": 3, "B-": 2.67, "C+": 2.33,
        "C": 2, "C-": 1.67, "F": 0
    },
    //Method To Add Another Row/Course
    add: function () {
        var tbody = document.getElementById('tbody')
        var tr = document.createElement('tr')
        tr.className = "rows"
        for (var i = 0; i < 3; i++) {
            var td = document.createElement('td')
            var input = document.createElement('input')
            var select
            switch (i) {
                case 0:
                    input.className = "courses"
                    td.appendChild(input)
                    break
                case 1:
                    select = createOptions(semester.gradeValues)
                    select.className = "grades"
                    td.appendChild(select)
                    break
                case 2:
                    select = createOptions(semester.creditValues)
                    select.className = "credits"
                    td.appendChild(select)
                    break
            }
            tr.appendChild(td)
        }
        tbody.appendChild(tr)
        document.getElementById('gpaContainer').innerHTML = ""
        document.getElementById('gpaContainer').className = ""
    },
    //Method To remove the last row
    remove: function () {
        var rows = document.getElementsByClassName('rows')
        if (rows.length > 1) {
            rows[rows.length - 1].remove();
        }
        document.getElementById('gpaContainer').innerHTML = ""
        document.getElementById('gpaContainer').className = ""
    },
    //Method To calculate GPA
    calculate: function () {
        var credits = document.getElementsByClassName('credits')
        var grades = document.getElementsByClassName('grades')
        var gradePoints = 0
        var sumOfCredits = 0
        for (var i = 0; i < grades.length; i++) {
            gradePoints += semester.gpaValues[grades[i].value] * credits[i].value
            sumOfCredits += parseInt(credits[i].value)
        }
        var gpa = (gradePoints / sumOfCredits).toFixed(2)
        document.getElementById('gpaContainer').innerHTML = "Your Gpa: " + gpa
        document.getElementById('gpaContainer').className = "gpaContainer"
    }
}

courseAddBtn.onclick = semester.add;
removeCourseBtn.onclick = semester.remove;
calculateBtn.onclick = semester.calculate;
