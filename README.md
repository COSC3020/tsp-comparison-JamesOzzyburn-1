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
| Input Size | Method | Average Time (seconds) |
| :--------: | ------ | ------------ |
| 10 | Held-Karp | 0.02529891 |
| 10 | Local Search | 0.00076351 |
| 11 | Held-Karp | 0.04702582 |
| 11 | Local Search | 0.00034759 |
| 12 | Held-Karp | 0.1035045 |
| 12 | Local Search | 0.10739804 |
| 13 | Held-Karp | 0.26647365 |
| 13 | Local Search | 0.00036646|
| 14 | Held-Karp | 0.71783076 |
| 14 | Local Search | 0.00033833 |
| 15 | Held-Karp | 1.88084158 |
| 15 | Local Search | 0.00026184 |
| 16 | Held-Karp | 4.52194415 |
| 16 | Local Search | 0.00052753 |
| 17 | Held-Karp | 10.1336665 |
| 17 | Local Search | 0.00044494 |
| 18 | Held-Karp | 23.6637384  |
| 18 | Local Search | 0.00065956 |
| 19 | Held-Karp | 52.0800634 |
| 19 | Local Search | 0.00063313 |
| 20 | Held-Karp | DNF (Ran 6+ Hours) |
| 20 | Local Search | 0.00073747 |
