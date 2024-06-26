[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/7Wc93oxi)
# Traveling Salesperson Problem -- Empirical Analysis

For this exercise, you'll need to take the code from the TSP Held-Karp and TSP
Local Search exercises. This can be your own implementation or somebody else's.
You will now do an empirical analysis of the implementations, comparing their
performance. Both the Held-Karp and the Local Search algorithms solve the same
problem, but they do so in completely different ways. This results in different
solutions, and in different times required to get to the solution.

Investigate the implementations' empirical time complexity, i.e. how the runtime
increases as the input size increases. *Measure* this time by running the code
instead of reasoning from the asymptotic complexity (this is the empirical
part). Create inputs of different sizes and plot how the runtime scales (input
size on the $x$ axis, time on the $y$ axis). Your largest input should have a
runtime of *at least* an hour. The input size that gets you to an hour will
probably not be the same for the Held-Karp and Local Search implementations.

In addition to the measured runtime, plot the tour lengths obtained by both
implementations on the same input distance matrices. The length of the tour that
Held-Karp found should always be less than or equal to the tour length that
Local Search found. Why is this?

Add the code to run your experiments, graphs, and an explanation of what you did
to this markdown file.

## Answer
Looked at how to do the table from countmooshroom
| Input Size | Method | Length Found |Average Time (seconds) |
| :--------: | ------ | ---- | ------------ |
| 10 | Held-Karp | 100 | 0.02529891 |
| 10 | Local Search | 326 | 0.00076351 |
| 11 | Held-Karp | 107 | 0.04702582 |
| 11 | Local Search | 214 | 0.00034759 |
| 12 | Held-Karp | 104 | 0.1035045 |
| 12 | Local Search | 104 | 0.10739804 |
| 13 | Held-Karp | 120 | 0.26647365 |
| 13 | Local Search | 438 | 0.00036646|
| 14 | Held-Karp | 130 | 0.71783076 |
| 14 | Local Search | 424 | 0.00033833 |
| 15 | Held-Karp | 100 | 1.88084158 |
| 15 | Local Search | 545 | 0.00026184 |
| 16 | Held-Karp | 108 | 4.52194415 |
| 16 | Local Search | 522 | 0.00052753 |
| 17 | Held-Karp | 141 | 10.1336665 |
| 17 | Local Search | 456 | 0.00044494 |
| 18 | Held-Karp | 143 | 23.6637384  |
| 18 | Local Search | 754 | 0.00065956 |
| 19 | Held-Karp | 155 | 52.0800634 |
| 19 | Local Search | 638 | 0.00063313 |
| 20 | Held-Karp | DNF | DNF (Ran 6+ Hours) |
| 20 | Local Search | 530 | 0.00073747 |

## Held Karp vs Local Search Graph
### Blue line is Held Karp and the red line is Local Search
![Held Karp vs Local Search Graph](https://github.com/COSC3020/tsp-comparison-JamesOzzyburn-1/blob/main/TSP%20Held%20Karp%20vs%20TSP%20Local%20Search.png?raw=true)

### Analysis
The main difference in the algorithms is that Held Karp will always find the best solution whereas Local Search finds a solution but it wont be the best. So in terms of usefulness it would really depend on your use case as if all you're looking for is good enough then local search is just fine for what you need. However if you are looking to squeeze out as much as you can then use Held Karp but then you will have to wait a very long time for anything with a good size. We can also see that the bigger the input size gets the worst the accuracy becomes with Local Search. The reason that the Held Karp paths are shorter than Local Search is due to Held Karp finding the optimum solution whereas Local Search finds close to it.
