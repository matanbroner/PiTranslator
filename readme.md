# PiTranslator

_Spencer Gautreaux_

_Matan Broner_

9 December 2021

## Executive Summary

Real time language translation is an important area of research. As the world becomes more interconnected, there is a growing interaction between the disparate groups. This project seeks to address these issues by removing the language barrier between these groups. We outline and build a system for near-real-time translation that can run on low power hardware. Utilizing the widespread Raspberry Pi platform and high-availability Google Cloud, users can leverage the latest advances in AI to get quality real time translation. This will remove language barriers that the users may experience without the need to expensive hardware.

## Introduction

### Background

TODO

### Needs Statement

TODO

### Goals and Objectives

TODO

### Design Constraints and Feasibility

TODO

## Literature Review

### Stepes

Stepes is a commercially available solution for "fast and professional IoT Translation services". Their goal is to allow IoT products (and companies thereof) to reach new markets through the use of translation services. As a commercial product, there is not a ton of insight in the implementation, however some details are still available. For example, Stepes' website describes their service as "Ai-enabled, cloud powered". This is similar to the product we develop in this project. However, Stepes also employs human translators. The role of these translators is unclear. By contrast, our system utilizes no human oversight on the translation process, a feature which helps improve timeliness of translation and security of the translation process. Stepes also requires a commercial contract (request for quote) whereas our system is built on open source api and hardware and runs on the widely available google API. This increases the transparency of our system and allows users to modify the system to satisfy their own requirements.

### An IoT Technology for Development of Smart English Language Translation and Grammar Learning Applications

This paper, by Jiang et. al. outlines processes and problems associated with IoT translations. They explore this problem in the context of English instruction and teaching. Furthermore, the aggregate the data and discuss the potential to apply this data to develop and refine the curriculum around learning english as a second language. The first part, the challenges of IoT helps to refine the needs statement for this project. For example, the need to rapidly translate within a classroom environment is a subset of our larger need statement. Likewise, in the classroom environment, cost is a major factor; it is untenable for a classroom to deploy expensive, high powered, compute devices to each student. The latter part of the paper, focused on english curriculum development, is less immediately relevant. However, it poses and interesting future work for this project. With enough scale, the ideas discussed therein could be realized; if enough users are working with the PiTranslator, a significant portion of aggregate data could be collected. This data could be applied to develope and refine the language learning experience in the manner outlined by Jiang et. al. It is an interesting possibility, but not one we explored in this project.

### Google Translate API

We intend to build our product on top of the Google Translate API. As such, it is necessary to discuss its strengths and weaknesses. Principally, the Google Translate API (hereafter GT API), is itself a commercial product in the Google Cloud product offering. For this reason, it is highly available, with near constant uptime. This means that the service, for the most part, can be taken as available. Unfortunately since this is a near turn-key solution, the GT API represents a single point of failure system; should it go offline our product ceases to function. This is unlikely, but a possibility nevertheless. 

The GT API leverages the massive compute power of Google Cloud to apply machine learning and produce consistently high-quality and accurate translations.  Being in the Google Cloud, GT API is continually and transparently updated to ensure that results are of the highest quality every time.

## Proposed Work

### Evaluation of Alternative Solutions

TODO

### Design Specification

TODO

### Approach for Design Validation

TODO

## Engineering Standards

### Project Management 

TODO

### Weekly Schedule of Tasks, Pert and Gantt charts

TODO

### Economic Analysis

TODO

### Itemized Budget

Item | Cost | Qty | Description 
----|----|--|-----------------
Raspberry Pi 3B+ | 34.99 | 2 | Compute Module for Raspberry Pi
SD Card | 7.99 | 2 | Store OS for Raspberry Pi
Headset Microphone Combo | 26.99 | 2 | Audio Input and Output
Battery | 19.99 | 2 |  Provide Power for the Devices

_Alternatively, a Raspberry Pi Zero W could be used. The per unit cost is then reduced from `34.99` to `9.99`_

## References


Stepes. https://www.stepes.com/iot-translation-services/ (accessed Dec 5. 2021)

Jiang, Y., Sabitha, R. & Shankar, A. An IoT Technology for Development of Smart English Language Translation and Grammar Learning Applications. Arab J Sci Eng (2021). https://doi.org/10.1007/s13369-021-05876-1

TODO

## Appendices

### Product Datasheets

TODO

### Bio-Sketch

#### Spencer Gautreaux

TODO

#### Matan Broner

TODO