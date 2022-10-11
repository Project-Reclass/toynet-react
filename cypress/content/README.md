# ToyNet Content

This repository is used by [Toynet's frontend application](https://github.com/Project-Reclass/toynet-react) to serve up curriculum content for submodules. It does not currently contain metadata on how the submodules are constructed.

This data will be hosted both in *S3* (for web users) and *Nginx* (for laptop users).
The typical bucket name for submodules will take the form: `toynet.<submodule_type>.<subomdule_number>`.
The same file path in this repository (used by Nginx) will be: `toynet-content/<submodule_type>/<submodule_number/`.
Files will have different formats depending on the submodule, but typically have a `meta.json` detailing the contents of the submodule as well as whatever text and image files needed to render the contents in `toynet-react`.

## Unique Identifiers

Article ID, Quiz ID, Value ID, and Lesson ID are unique across submodules and collectively called Submodule IDs. They happen to be sequential per submodule type here for human-readability, but they do not need to be, and will not be.

Once we will build out a separate data storage to order submodules within modules of a curriculum, these identifiers will be replaced by a randomly generated key.

---

## Examples

### S3
* S3 bucket: `toynet.article.<submod_num>`
* file: `article.md`
* metadata in bucket: `meta.json`
* metadata references images associated with article: submodule `toynet.article.<submod_num>` file `1.jpeg`

### Nginx
* file in repository: `toynet-content/article/<submod_num>.article.md`
* meta data in repository: `toynet-content/article/<submod_num>.meta.json` (includes reference to article/<submod_num>.1.jpeg)

---

There are currently four `submodule_type`s we support.

## Lessons
Directory: `lesson/`
The lesson submodule is akin to a lecture on the subject matter. For now, it is a series of screenshots of Google Slides, but this is no its final evolution as it is costly to alter and serve compared to vectorized material.

* `meta.json` - contains current count of images in folder
```
{
    "numSlides": 8
}
```
* Set of images ordered currently by filename (`0.png`, `1.png`, etc) which constitute currciulum

*Note:* We are likely moving to reveal.js to render curriculum which may change the format of this submodule data

---

## Quizzes
Directory: `quiz/`
The quiz submodule is modeled off the classic multiple choice question.

* `meta.json` - contains a serial list of: (question, four choices, index of the correct answer)
```
{
    'items': [
        {
            "question": "In order to send an IP Packet, what is the first step before it can get sent?",
            "options": [
                "Deencapsulation",
                "Routing",
                "Gateway",
                "Encapsulation"
            ],
            "answer": 4
        },
        {
            "question": "Which Small Factor Pluggable is capable of speeds over 40 Gbps?",
            "options": [
                "Small Factor Pluggable (SFP)",
                "Quad Small Factor Pluggable (QSFP)",
                "Small Factor Pluggable Plus (SFP+)",
                "Multi Small Factor Pluggable (MSFP)"
            ],
            "answer": 2
        }
    ]
}
```

---

## Values
Directory: `value/`
The values submodule urges users to take a moment in their session to reflect on one of Reclass's ten values which cycle throughout their coursework. We sourced the first nine values from preexisting military values as well as one we have added, `Grit`.

* `meta.json` - contains a Reclass value and definitions from differnet military branches or `Reclass` in the case of `Grit`.
```
{
    "value": "Integrity",
    "inspiration": [
        {
            "organization": "U.S. Air Force",
            "definition": "Integrity is the adherence to a strong moral code and consistency in one’s actions and values [...] Airmen should be guided by a deeply held sense of honor, not one of personal comfort or uncontrolled selfish appetites."
        },
        {
            "organization": "U.S. Army",
            "definition": "Do what’s right, legally and morally. Integrity is a quality you develop by adhering to moral principles. It requires that you do and say nothing that deceives others. As your integrity grows, so does the trust others place in you […] and, finally, the fundamental acceptance of yourself."
        }
    ]
}
```

---

## Articles
Directory: `article/`
Some students prefer real-world scenarios when learning new concepts. The articles submodule brings in news articles covering relevant networking concepts. It will likely be an opt-in submodule type meaning students will have the ability to skip it and still complete the course.

* `meta.json` - contains the URL source of the text, original title, author, and a series of images included in the article (optionally includes citations or captions if provided by news provider)
```
{
    "source": "https://www.wired.co.uk/article/vint-cerf-interplanetary-internet",
    "title": "Father of the internet, Vint Cerf, on creating the interplanetary internet",
    "author": "Adam Mann",
    "images": [
        {
            "file": "1.jpg",
            "credit": "NASA/JPL"
        },
        {
            "file": "2.jpg",
            "caption": "Father of the Internet Vint Cerf is responsible for helping develop the TCP/IP protocols that underly the web. In his role as Google’s chief internet evangelist, Cerf is dedicated to thinking about the future of the net, including its use in space",
            "credit": "Guido van Nispen/Flickr/CC BY 2.0"
        }
    ]
}
```

* list of images referenced in `meta.json`
* `article.md` - text content
```
When some future Mars colonist is able to open his browser and watch a cat in a shark suit chasing a duck while riding a roomba, they will have Vint Cerf to thank.

In his role as Google's chief internet evangelist, Cerf has spent much of his time thinking about the future of the computer networks that connect us all. And he should know. Along with Bob Kahn, he was responsible for developing the internet protocol suite, commonly known as TCP/IP, that underlies the workings of the net. Not content with just being a founding father of the internet on this planet, Cerf has spent years taking the world wide web out of this world.

Working with NASA and JPL, Cerf has helped develop a new set of protocols that can stand up to the unique environment of space, where orbital mechanics and the speed of light make traditional networking extremely difficult. Though this space-based network is still in its early stages and has few nodes, he said that we are now at "the front end of what could be an evolving and expanding interplanetary backbone."

Wired.com talked to Cerf about the interplanetary internet's role in space exploration, the frustrations of network management on the final frontier, and the future headline he never wants to see.
```
