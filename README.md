Course Assignment for Information Retrieval

### DS 501: Assignment 1

### Create a REST API which uses ElasticSearch for indexing and searching.

Create an index for this ​Netflix​ dataset. Use it to implement a Netflix search API with the
following functionalities.

## A. Auto Completion Endpoints ​:

a. _Endpoint for Adults:_ Returns top 5 results(suggestions) for a random text search
i.e. when a user types the text “to”, it should return top 5 suggestion(docs)
containing today, tomorrow, told etc. You may assume that you are given the
searched text and then continue with your design.

b. _Child Proof Endpoint:_ Same functionality as (a) with an additional constraint that
it filters out all R, NC, PG rated Movies/TV shows from all search results.

B. _Pagination (Sorted by release_year) Endpoint:_
Netflix dataset contains a field “release_year”. Your task is to return PS (page size)
number of Movies/TV show documents for a given page number i.e. If page size is 10
and page number is 9, you will be returning Movies/TV show documents 81-90 sorted in
descending order of release year. There will be separate end-points for Movies and TV
Shows.

_C. Custom Queries:_

a. _Exact match Endpoint:_ Return the Movies/TV shows matching exact names for
the specified fields. Example - For specified ”director” field in the dataset return
all those docs which exactly match the director name. Use N-gram filter for
analyzer where N = (Your Group Number % 4) + 2.

b. _Prefix Match Endpoint:_ Return the Movies/TV shows whose descriptions start
with the specified query. Example - If the query is “after”, return Movies/TV shows
with “description” starting with “After”.

_c. Genre Match Endpoint: Return the_ ​Movies/TV shows whose genre match the
boolean query terms. ​Example _-_ ​the query can be “Drama and (Comedy or
Horror)”, and you should return Movies/TV shows with genre “Drama and
Comedy” or “Drama and Horror”.

_Submission Details:_
a. Your Netflix Search API should be deployed remotely (For example, Heroku).
b. Note: You are designing backend APIs and need not design any front-end components.
c. Submit a PDF/Word/Latex document with your endpoint details, parameters, method
(GET, PUT, POST etc.) with one example for each endpoint. Clearly state details of
analyzers, tokenizers, filters, mapping, query type used for the same.



