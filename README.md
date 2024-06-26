# studentAssess

# Requirement: 

Create a web application to assist school teachers to conduct practice exams for primary school 
students. Assume the exam is always a multiple-choice question (MCQ) based.
As a part of the solution, you need to implement 2 different screens, details of which are given 
below.
1) Teacher’s Home
a. A teacher should be able to manage multiple classes (or batches), subjects and 
students enrolled in a class for a subject. (For ex: teacher should be able to manage 
exam of (let us say) class 5th and 6th for subject Mathematics and Science respectively 
along with the students who are enrolled in these respective classes.)
b. A teacher should be able to upload a question bank for a particular class and a subject 
(in csv / excel form) which contains data about questions, their possible 4 options and a
correct answer (assume there will be only one option as correct answer out of 4 
options).
2) Student’s Home
a. A student should be able to take a practice exam for a particular subject. To simulate 
student giving exam, have student just click a button “Take Exam” which selects a set of 
fixed number of questions (say 100) from question bank randomly and assign them a 
random answer by selecting one of the 4 options.
b. A student should be able to review his/her practice exam performance in both offline 
and online mode.
i. Offline Mode:
1. Generate a PDF automatically with all the questions which were 
selected for the practice exam. Each page of the PDF should contain 
details of exactly one question i.e., question text, its 4 possible options, 
answer option selected by student (currently random for simulation), 
and the actual correct answer as present in the question bank (as 
uploaded by teacher).
2. A student should be able to view/print and download this PDF for offline 
review.
ii. Online Mode:
1. Student should be able to view all the questions which were selected for 
the practice exam in a tabular grid where there are 8 columns (namely 
question text, column for each of the 4 options, student’s selected 
answer, correct answer, whether the answer correct or incorrect)
2. Grid should have at least the features of filtering, sorting and pagination 
available to make it easier for the student to navigate and find the right
information quickly.
3. A student should be able to filter correct/incorrect answers and have a 
count for the same.
4. A student should be able to select different questions (for ex: all 
questions where answers were incorrect) from the grid and generate a 
PDF for the same for allowing them to practice them later in offline 
mode. (Hint: You can see how you can reuse the implementation of the 
offline mode above in part i).

