$(document).ready(function () {

    var getServerData = function () { //функция, эмулирующая получение данных от сервера
        var data = [
            new StudentModel("Иван", "Иванов", "1990-09-30", "АСОИ-135"),
            new StudentModel("Петр", "Петров", "1990-05-03", "АСОИ-135"),
            new StudentModel("Андрей", "Андреев", "1990-05-09", "АСОИ-136"),
            new StudentModel("Сидор", "Сидоров", "1990-02-01", "АСОИ-136"),
            new StudentModel("Кирилл", "Кириллов", "1989-12-29", "ЗИ-105"),
            new StudentModel("Джон", "Джонов", "1989-12-22", "ЗИ-105"),
            new StudentModel("Вячеслав", "Насыпьте", "1990-04-05", "ИВТ-111"),
            new StudentModel("Платон", "Платонов", "1990-08-17", "ИВТ-111"),
            new StudentModel("Зинедин", "Зидан", "1990-10-10", "ИВТ-112"),
            new StudentModel("Миакальцик", "Патов", "1990-07-11", "ИВТ-112")
        ];
        var result = [];
        for (var i = 0; i < 4; i++) {
            //выбираем 4 случайных студента
            result.push(data[Math.floor((Math.random() * 10))]);
        }
        return result;
    };

    var StudentModel = function (firstName, lastName, birthdate, group) {
        this.firstName = ko.observable(firstName);
        this.lastName = ko.observable(lastName);
        this.birthdate = ko.observable(birthdate);
        this.group = ko.observable(group);

        this.fullName = ko.pureComputed(function () {
            return this.firstName() + " " + this.lastName();
        }, this);
    };

    var StudentListModel = function (students) {
        var self = this;
        self.students = ko.observableArray(students);
        self.selectedStudent = ko.observable(new StudentModel());

        self.add = function () {
            self.students.push(self.selectedStudent());
            self.clear();
        };

        self.remove = function () {
            self.students.remove(self.selectedStudent());
            self.clear();
        };

        self.clear = function () {
            self.selectedStudent(new StudentModel());
        };

        self.select = function (selectedStudent) {
            if (self.selectedStudent() === selectedStudent) {
                self.clear();
            } else {
                self.selectedStudent(selectedStudent);
            }
        };

        self.update = function () {
            self.students(getServerData());
            self.clear();
        };

        self.notInList = function () {
            return self.students.indexOf(self.selectedStudent()) === -1;
        };

        self.notEmpty = function () {
            var student = self.selectedStudent();
            return student.firstName() && student.lastName() && student.birthdate() && student.group();
        };
    };

    ko.applyBindings(new StudentListModel(getServerData()));
});