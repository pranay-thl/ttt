# Terribly Tiny Tales

Given a number N and a text file, find N topmost occuring words.

### Project Link

https://tttdemo.herokuapp.com/

### Technology Used

The  Project is developed in NodeJs and AngularJs

## Code Components

The Code is divided into 4 parts:
1. Reading given data
2. Preprocessing: Removing extra spaces, special characters, converting the text to lower case and then splitting the entire text into words.
3. Indexing: Creating a dictionary containing frequency for each words
4. Sorting: Sorting the above created dictionary in decreasing order of word frequency

The main idea is to solve the given query as fast as possible, so I have preprocessed the entire data and kept in into a sorted order. Whenver a query for 'N' comes, the server just return the first N elements of the sorted words.
This prevents unnecessary computatiton for each query. 

### Modules used

'express' for creating rest APIs


### Test Cases

The form accepts just integers greater than 1, so this removes the possibility of alphabetic as well as negative inputs.
There is a corner case when the given 'N' is greater than the number of words in the file. This case is handled as well.

Test case :Initial Page

![alt text](https://raw.githubusercontent.com/pranay-thl/ttt/master/demo/1.png)

Test case: N=1

![alt text](https://raw.githubusercontent.com/pranay-thl/ttt/master/demo/2.png)

Test case: N=5

![alt text](https://raw.githubusercontent.com/pranay-thl/ttt/master/demo/3.png)

Test case: N=50

![alt text](https://raw.githubusercontent.com/pranay-thl/ttt/master/demo/4.png)

Test case: N=500

![alt text](https://raw.githubusercontent.com/pranay-thl/ttt/master/demo/5.png)






