
// import {Injectable} from "@angular/core";
// import {HttpClient, HttpParams} from "@angular/common/http";
// import {Observable} from "rxjs";
// import {map} from "rxjs/operators";
// import { Community } from "@riddet-app/data";


// @Injectable()
// export class CoursesHttpService {

//     constructor(private http:HttpClient) {

//     }

//     findAllCourses(): Observable<Course[]> {
//         return this.http.get<Course[]>('/api/courses')
//           .pipe(
//             map(courses => courses.sort(compareCourses))
//           );
//     }

//     findCourseByUrl(courseUrl: string): Observable<Course> {
//       return this.http.get<Course>(`/api/courses/${courseUrl}`);
//     }

//     findLessons(
//         courseId:string,
//         pageNumber = 0, pageSize = 3):  Observable<Lesson[]> {

//         return this.http.get<Lesson[]>('/api/lessons', {
//             params: new HttpParams()
//                 .set('courseId', courseId)
//                 .set('sortOrder', 'asc')
//                 .set('pageNumber', pageNumber.toString())
//                 .set('pageSize', pageSize.toString())
//         });
//     }


//     updateCourse(courseId: string, changes: Partial<Course>) {
//         return this.http.put('/api/courses/' + courseId, changes);
//     }


//   deleteCourse(courseId: string) {
//       return this.http.delete('/api/courses/' + courseId);
//   }

//   createCourse(changes: Partial<Community>) {
//       return this.http.post('/api/courses', changes);
//   }
// }