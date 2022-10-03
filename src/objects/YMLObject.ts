export interface YMLObject {
  //This string MUST be the semantic version number of the OpenAPI Specification version that the OpenAPI document uses.
  //The openapi field SHOULD be used by tooling specifications and clients to interpret the OpenAPI document.
  //This is not related to the API info.version string.
  openapi: string;
  //An array of Server Objects, which provide connectivity information to a target server. If the servers property is not provided, or is an empty array, the default value would be a Server Object with a url value of /.
  servers: XLogo[];
  //Provides metadata about the API. The metadata MAY be used by tooling as required.
  info: Info;
  //A list of tags used by the specification with additional metadata. The order of the tags can be used to reflect on their order by the parsing tools.
  //Not all tags that are used by the Operation Object must be declared. The tags that are not declared MAY be organized randomly or based on the tools' logic. Each tag name in the list MUST be unique.
  externalDocs: ExternalDocs;
  //The available paths and operations for the API.
  paths: Array<Path>;
  //An element to hold various schemas for the specification.
  components: Components;
  //A declaration of which security mechanisms can be used across the API. The list of values includes alternative security requirement objects that can be used. Only one of the security requirement objects need to be satisfied to authorize a request. Individual operations can override this definition. To make security optional, an empty security requirement ({}) can be included in the array.
  security: Security[];
  //A list of tags used by the specification with additional metadata. The order of the tags can be used to reflect on their order by the parsing tools. Not all tags that are used by the Operation Object must be declared. The tags that are not declared MAY be organized randomly or based on the tools' logic. Each tag name in the list MUST be unique.
  tags: Tag;
}

export class OutputMapObject {
  property: string = '';
  output: string = '';
  constructor(property: string, output: string = '') {
    this.property = property;
    if (output == '') {
      output = property;
    }
    this.output = output;
  }
}

export interface BaseInterface {
  editable: Array<string>;
  outputMap: Array<OutputMapObject>;
}

export class InfoImpl implements Info {
  editable: Array<string> = [
    'title',
    'termsOfService',
    'contact',
    'license',
    'logo',
    'description',
  ];
  outputMap: Array<OutputMapObject> = [
    new OutputMapObject('title'),
    new OutputMapObject('termsOfService'),
    new OutputMapObject('contact'),
    new OutputMapObject('license'),
    new OutputMapObject('logo', 'x-logo'),
    new OutputMapObject('description'),
  ];

  version: string = '';
  title: string = '';
  termsOfService: string = '';
  contact: Contact = new URLObject();
  license: License = new URLObject();
  logo: XLogo = new URLObject();
  description: string = '';
}

export interface Info extends BaseInterface {
  version: string;
  title: string;
  termsOfService: string;
  contact: Contact;
  license: License;
  logo: XLogo;
  description: string;
}

export interface Components {
  schemas: Schemas;
  securitySchemes: SecuritySchemes;
}

export interface Schemas {
  ObjectId: ObjectID;
  CountQuery: CountQuery;
  IdsGroup: IDSGroup;
  ListQuery: ListQuery;
  Book: Book;
  Person: Person;
  Blob: Blob;
  Uri: Blob;
  Persons: Persons;
  Creator: Creator;
  IntegerGroup: IntegerGroup;
  Chapter: Chapter;
  Front: Back;
  Back: Back;
  Error: Error;
}

export interface Back {
  description: string;
  type: string;
  required: string[];
  properties: BackProperties;
  example: Example;
}

export interface Example {
  id: number;
  content: string[];
}

export interface BackProperties {
  id: Items;
  content: ContentElement;
  illustration: ContentElement;
}

export interface ContentElement {
  type: string;
  items?: Blob;
}

export interface Blob {
  type: Type;
}

export enum Type {
  Integer = 'integer',
  String = 'string',
}

export interface Items {
  $ref: string;
}

export interface Book {
  type: string;
  required: string[];
  properties: BookProperties;
}

export interface BookProperties {
  id: Items;
  isbn: Description;
  description: Description;
  title: Description;
  edition: Description;
  author: Items;
  illustrator: Items;
  front: Items;
  back: Items;
  chapters: Persons;
}

export interface Persons {
  type: string;
  items: Items;
}

export interface Description {
  type: Type;
  example: string;
}

export interface Chapter {
  type: string;
  required: string[];
  properties: ChapterProperties;
  example: Example;
}

export interface ChapterProperties {
  id: Items;
  title: Blob;
  content: ContentElement;
}

export interface CountQuery {
  type: string;
  properties: CountQueryProperties;
}

export interface CountQueryProperties {
  count: ObjectID;
  start: ObjectID;
}

export interface ObjectID {
  description: string;
  type: Type;
}

export interface Creator {
  example: string;
  oneOf: Items[];
}

export interface Error {
  type: string;
  required: string[];
  properties: ErrorProperties;
}

export interface ErrorProperties {
  message: ObjectID;
}

export interface IDSGroup {
  type: string;
  properties: IDSGroupProperties;
}

export interface IDSGroupProperties {
  ids: IDS;
}

export interface IDS {
  description: string;
  $ref: string;
}

export interface IntegerGroup {
  oneOf: ContentElement[];
}

export interface ListQuery {
  oneOf: Items[];
}

export interface Person {
  type: string;
  required: string[];
  properties: PersonProperties;
}

export interface PersonProperties {
  id: Items;
  name: Blob;
  fname: Blob;
  otherNames: Blob;
  countryOfOrigin: Blob;
  biography: Biography;
}

export interface Biography {
  anyOf: Items[];
}

export interface SecuritySchemes {
  ApiKey: APIKey;
}

export interface APIKey {
  type: string;
  in: string;
  name: string;
}

export interface ExternalDocs extends BaseInterface {
  description: string;
  url: string;
}

export interface Contact extends BaseInterface {
  email: string;
  url: string;
}

export interface License extends BaseInterface {
  name: string;
  url: string;
}

export interface XLogo extends BaseInterface {
  url: string;
}

export class URLObject implements XLogo, Contact, License, ExternalDocs {
  editable: Array<string> = ['email', 'name', 'url', 'description'];
  outputMap: Array<OutputMapObject> = [
    new OutputMapObject('email'),
    new OutputMapObject('name'),
    new OutputMapObject('url'),
    new OutputMapObject('description'),
  ];
  description: string = '';
  email: string = '';
  name: string = '';
  url: string = '';
}

export interface Path extends BaseInterface {
  path: string;
  summary: string;
  description: string;
  get: OperationObject; //A definition of a GET operation on this path.
  put: OperationObject; //A definition of a PUT operation on this path.
  post: OperationObject; //A definition of a POST operation on this path.
  delete: OperationObject; //A definition of a DELETE operation on this path.
  options: OperationObject; //A definition of a OPTIONS operation on this path.
  head: OperationObject; //A definition of a HEAD operation on this path.
  patch: OperationObject; //A definition of a PATCH operation on this path.
  trace: OperationObject; //	A definition of a TRACE operation on this path.
  servers: ServerObject;
  parameters: ParameterObject;
}

export interface OperationObject {
  //A list of tags for API documentation control. Tags can be used for logical grouping of operations by resources or any other qualifier.
  tags: Array<string>;
  //A short summary of what the operation does.
  summary: string;
  //A verbose explanation of the operation behavior. CommonMark syntax MAY be used for rich text representation.
  description: string;
  //Additional external documentation for this operation.
  externalDocs: ExternalDocs;
  //Unique string used to identify the operation. The id MUST be unique among all operations described in the API. The operationId value is case-sensitive. Tools and libraries MAY use the operationId to uniquely identify an operation, therefore, it is RECOMMENDED to follow common programming naming conventions.
  operationId: string;
  //A list of parameters that are applicable for this operation. If a parameter is already defined at the Path Item, the new definition will override it but can never remove it. The list MUST NOT include duplicated parameters. A unique parameter is defined by a combination of a name and location. The list can use the Reference Object to link to parameters that are defined at the OpenAPI Object's components/parameters.
  parameters: Array<ParameterObject>;
  //The request body applicable for this operation. The requestBody is only supported in HTTP methods where the HTTP 1.1 specification RFC7231 has explicitly defined semantics for request bodies. In other cases where the HTTP spec is vague, requestBody SHALL be ignored by consumers.
  requestBody: RequestBodyObject;
  //The list of possible responses as they are returned from executing this operation.
  responses: ResponseObject;
  //callbacks	Map[string, Callback Object | Reference Object]
  //A map of possible out-of band callbacks related to the parent operation. The key is a unique identifier for the Callback Object. Each value in the map is a Callback Object that describes a request that may be initiated by the API provider and the expected responses.
  //Declares this operation to be deprecated. Consumers SHOULD refrain from usage of the declared operation. Default value is false.
  deprecated: boolean;
  //A declaration of which security mechanisms can be used for this operation. The list of values includes alternative security requirement objects that can be used. Only one of the security requirement objects need to be satisfied to authorize a request. To make security optional, an empty security requirement ({}) can be included in the array. This definition overrides any declared top-level security. To remove a top-level security declaration, an empty array can be used.
  security: SecurityRequirementObject;
  //An alternative server array to service this operation. If an alternative server object is specified at the Path Item Object or Root level, it will be overridden by this value.
  servers: Array<ServerObject>;
}

export class OperationObjectImpl implements OperationObject {
  //A list of tags for API documentation control. Tags can be used for logical grouping of operations by resources or any other qualifier.
  tags: Array<string> = [];
  //A short summary of what the operation does.
  summary: string = '';
  //A verbose explanation of the operation behavior. CommonMark syntax MAY be used for rich text representation.
  description: string = '';
  //Additional external documentation for this operation.
  externalDocs: ExternalDocs = new URLObject();
  //Unique string used to identify the operation. The id MUST be unique among all operations described in the API. The operationId value is case-sensitive. Tools and libraries MAY use the operationId to uniquely identify an operation, therefore, it is RECOMMENDED to follow common programming naming conventions.
  operationId: string = '';
  //A list of parameters that are applicable for this operation. If a parameter is already defined at the Path Item, the new definition will override it but can never remove it. The list MUST NOT include duplicated parameters. A unique parameter is defined by a combination of a name and location. The list can use the Reference Object to link to parameters that are defined at the OpenAPI Object's components/parameters.
  parameters: Array<ParameterObject> = [];
  //The request body applicable for this operation. The requestBody is only supported in HTTP methods where the HTTP 1.1 specification RFC7231 has explicitly defined semantics for request bodies. In other cases where the HTTP spec is vague, requestBody SHALL be ignored by consumers.
  requestBody: RequestBodyObject = {};
  //The list of possible responses as they are returned from executing this operation.
  responses: ResponseObject = {};
  //callbacks	Map[string, Callback Object | Reference Object]
  //A map of possible out-of band callbacks related to the parent operation. The key is a unique identifier for the Callback Object. Each value in the map is a Callback Object that describes a request that may be initiated by the API provider and the expected responses.
  //Declares this operation to be deprecated. Consumers SHOULD refrain from usage of the declared operation. Default value is false.
  deprecated: boolean = false;
  //A declaration of which security mechanisms can be used for this operation. The list of values includes alternative security requirement objects that can be used. Only one of the security requirement objects need to be satisfied to authorize a request. To make security optional, an empty security requirement ({}) can be included in the array. This definition overrides any declared top-level security. To remove a top-level security declaration, an empty array can be used.
  security: SecurityRequirementObject = {};
  //An alternative server array to service this operation. If an alternative server object is specified at the Path Item Object or Root level, it will be overridden by this value.
  servers: Array<ServerObject> = [];
}

export interface ParameterObject {
  //The name of the parameter. Parameter names are case sensitive.
  //If in is "path", the name field MUST correspond to a template expression occurring within the path field in the Paths Object. See Path Templating for further information.
  //If in is "header" and the name field is "Accept", "Content-Type" or "Authorization", the parameter definition SHALL be ignored.
  //For all other cases, the name corresponds to the parameter name used by the in property.
  name: string;
  //The location of the parameter. Possible values are "query", "header", "path" or "cookie".
  in: string;
  //A brief description of the parameter. This could contain examples of use. CommonMark syntax MAY be used for rich text representation.
  description: string;
  //Determines whether this parameter is mandatory. If the parameter location is "path", this property is REQUIRED and its value MUST be true. Otherwise, the property MAY be included and its default value is false.
  required: boolean;
  //Specifies that a parameter is deprecated and SHOULD be transitioned out of usage. Default value is false.
  deprecated: boolean;
  //Sets the ability to pass empty-valued parameters. This is valid only for query parameters and allows sending a parameter with an empty value. Default value is false. If style is used, and if behavior is n/a (cannot be serialized), the value of allowEmptyValue SHALL be ignored. Use of this property is NOT RECOMMENDED, as it is likely to be removed in a later revision.
  allowEmptyValue: boolean;
}
export class ParameterObjectImpl implements ParameterObject {
  //The name of the parameter. Parameter names are case sensitive.
  //If in is "path", the name field MUST correspond to a template expression occurring within the path field in the Paths Object. See Path Templating for further information.
  //If in is "header" and the name field is "Accept", "Content-Type" or "Authorization", the parameter definition SHALL be ignored.
  //For all other cases, the name corresponds to the parameter name used by the in property.
  name: string = '';
  //The location of the parameter. Possible values are "query", "header", "path" or "cookie".
  in: string = '';
  //A brief description of the parameter. This could contain examples of use. CommonMark syntax MAY be used for rich text representation.
  description: string = '';
  //Determines whether this parameter is mandatory. If the parameter location is "path", this property is REQUIRED and its value MUST be true. Otherwise, the property MAY be included and its default value is false.
  required: boolean = false;
  //Specifies that a parameter is deprecated and SHOULD be transitioned out of usage. Default value is false.
  deprecated: boolean = false;
  //Sets the ability to pass empty-valued parameters. This is valid only for query parameters and allows sending a parameter with an empty value. Default value is false. If style is used, and if behavior is n/a (cannot be serialized), the value of allowEmptyValue SHALL be ignored. Use of this property is NOT RECOMMENDED, as it is likely to be removed in a later revision.
  allowEmptyValue: boolean = true;
}

export interface RequestBodyObject {}
export interface ResponseObject {}
export interface SecurityRequirementObject {}

export interface ServerObject {
  url: string;
  description: string;
  variables: Array<ServerVariableObject>;
}

export class ServerObjectImpl implements ServerObject {
  url: string = '';
  description: string = '';
  variables: Array<ServerVariableObject> = [];
}

export interface ServerVariableObject {
  enum: Array<string>;
  default: string;
  description: string;
}

export class ServerVariableObjectImpl implements ServerVariableObject {
  //An enumeration of string values to be used if the substitution options are from a limited set. The array SHOULD NOT be empty.
  enum: Array<string> = [];
  //The default value to use for substitution, which SHALL be sent if an alternate value is not supplied. Note this behavior is different than the Schema Object's treatment of default values, because in those cases parameter values are optional. If the enum is defined, the value SHOULD exist in the enum's values.
  default: string = '';
  //An optional description for the server variable. CommonMark syntax MAY be used for rich text representation.
  description: string = '';
}

export class ParameterObject {}

export interface Security {
  ApiKey: any[];
}
export interface Tag {}
