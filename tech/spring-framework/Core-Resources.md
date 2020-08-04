# Core Technologies

## Resources

Java’s standard `java.net.URL` class and standard handlers for various `URL` prefixes, unfortunately, are not quite adequate enough for all access to low-level resources. For example, there is no standardized URL implementation that may be used to access a resource that needs to be obtained from the classpath or relative to a `ServletContext`. While it is possible to register new handlers for specialized `URL` prefixes (similar to existing handlers for prefixes such as `http:`), this is generally quite complicated, and the `URL` interface still lacks some desirable functionality, such as a method to check for the existence of the resource being pointed to.

### The Resource Interface

Spring’s `Resource` interface is meant to be a more capable interface for abstracting access to low-level resources. The following listing shows the `Resource` interface definition:

```java
public interface Resource extends InputStreamSource {

    boolean exists();

    boolean isOpen();

    URL getURL() throws IOException;

    File getFile() throws IOException;

    Resource createRelative(String relativePath) throws IOException;

    String getFilename();

    String getDescription();
}
```

Some of the most important methods from the `Resource` interface are:

- `getInputStream()`: Locates and opens the resource, returning an `InputStream` for reading from the resource. It is expected that each invocation returns a fresh `InputStream`. It is the responsibility of the caller to close the stream.

- `exists()`: Returns a `boolean` indicating whether this resource actually exists in physical form.

- `isOpen()`: Returns a `boolean` indicating whether this resource represents a handle with an open stream. If `true`, the `InputStream` cannot be read multiple times and must be read once only and then closed to avoid resource leaks. Returns `false` for all usual resource implementations, with the exception of `InputStreamResource`.

- `getDescription()`: Returns a description for this resource, to be used for error output when working with the resource. This is often the fully qualified file name or the actual URL of the resource.

Other methods let you obtain an actual `URL` or `File` object representing the resource (if the underlying implementation is compatible and supports that functionality).

### Built-in Resource Implementations

Spring includes the following Resource implementations:

- `UrlResource`

- `ClassPathResource`

- `FileSystemResource`

- `ServletContextResource`

- `InputStreamResource`

- `ByteArrayResource`

#### UrlResource

`UrlResource` wraps a `java.net.URL` and can be used to access any object that is normally accessible with a `URL`, such as **files, an HTTP target, an FTP target, and others**. All URLs have a standardized String representation, such that appropriate standardized prefixes are used to indicate one `URL` type from another. This includes `file:` for accessing filesystem paths, `http:` for accessing resources through the HTTP protocol, `ftp:` for accessing resources through FTP, and others.

#### ClassPathResource

This class represents a resource that should be obtained from the classpath. 

This `Resource` implementation supports resolution as `java.io.File` if the class path resource resides in the file system but not for classpath resources that reside in a jar and have not been expanded (by the servlet engine or whatever the environment is) to the filesystem. To address this, the various `Resource` implementations always support resolution as a `java.net.URL`.

#### FileSystemResource

This is a `Resource` implementation for `java.io.File` and `java.nio.file.Path` handles. It supports resolution as a File and as a `URL`.

#### ServletContextResource

This is a `Resource` implementation for `ServletContext` resources that interprets relative paths within the relevant web application’s root directory.

#### InputStreamResource

An `InputStreamResource` is a `Resource` implementation for a given `InputStream`. It should be used only if no specific `Resource` implementation is applicable. In particular, prefer `ByteArrayResource` or any of the file-based `Resource` implementations where possible.

#### ByteArrayResource

This is a `Resource` implementation for a given byte array. It creates a `ByteArrayInputStream` for the given byte array.

It is useful for loading content from any given byte array without having to resort to a single-use `InputStreamResource`.

## The ResourceLoader

The `ResourceLoader` interface is meant to be implemented by objects that can return (that is, load) `Resource` instances.

```java
public interface ResourceLoader {

    Resource getResource(String location);
}
```

All `ApplicationContext`s implement the `ResourceLoader` interface. Therefore, all application contexts may be used to obtain `Resource` instances.

```java
Resource template = ctx.getResource("some/resource/path/myTemplate.txt");
```

The following table summarizes the strategy for converting `String` objects to `Resource` objects:

| Prefix     | Example                        | Explanation                                                               |
|------------|--------------------------------|---------------------------------------------------------------------------|
| `classpath:` | `classpath:com/myapp/config.xml` | Loaded from the classpath.                                                |
| `file:`      | `file:///data/config.xml`        | Loaded as a `URL` from the filesystem. |
| `http:`      | `https://myserver/logo.png`      | Loaded as a URL.                                                          |
| (none)     | `/data/config.xml`               | Depends on the underlying `ApplicationContext`.                             |

### The ResourceLoaderAware interface

The `ResourceLoaderAware` interface is a special callback interface which identifies components that expect to be provided with a `ResourceLoader` reference. 

When a class implements `ResourceLoaderAware` and is deployed into an application context (as a Spring-managed bean), it is recognized as `ResourceLoaderAware` by the application context. The application context then invokes `setResourceLoader(ResourceLoader)`, supplying **itself as the argument** (remember, all application contexts in Spring implement the `ResourceLoader` interface).

Since an `ApplicationContext` is a `ResourceLoader`, the bean could also implement the `ApplicationContextAware` interface and use the supplied application context directly to load resources. However, in general, **it is better to use the specialized `ResourceLoader` interface if that is all you need**. The code would be coupled only to the resource loading interface (which can be considered a utility interface) and not to the whole Spring `ApplicationContext` interface.

### Application Contexts and Resource Paths

#### Constructing Application Contexts

An application context constructor (for a specific application context type) generally takes a string or array of strings as the location paths of the resources, such as XML files that make up the definition of the context.

When such a location path does not have a prefix, the specific `Resource` type built from that path and used to load the bean definitions depends on and is appropriate to the specific application context.

Note that **the use of the special classpath prefix or a standard URL prefix on the location path overrides the default type of `Resource` created to load the definition**. Consider the following example:

```java
ApplicationContext ctx = new FileSystemXmlApplicationContext("classpath:conf/appContext.xml");
```

Using `FileSystemXmlApplicationContext` loads the bean definitions from the `ClassPathResource`. `FileSystemXmlApplicationContext` inherits class `DefaultResourceLoader`:

```java
public class DefaultResourceLoader implements ResourceLoader
{

    // ...

    public Resource getResource(String location) {
    Assert.notNull(location, "Location must not be null");
    
    for (ProtocolResolver protocolResolver : getProtocolResolvers()) {
      Resource resource = protocolResolver.resolve(location, this);
      if (resource != null) {
        return resource;
      }
    } 
    
    if (location.startsWith("/")) {
      return getResourceByPath(location);
    }
    if (location.startsWith("classpath:")) {
      return new ClassPathResource(location.substring("classpath:".length()), getClassLoader());
    }

    
    try {
      URL url = new URL(location);
      return ResourceUtils.isFileURL(url) ? new FileUrlResource(url) : new UrlResource(url);
    }
    catch (MalformedURLException ex) {
      
      return getResourceByPath(location);
    } 
  }

  // ...
}
```

##### Constructing ClassPathXmlApplicationContext Instances — Shortcuts

The `ClassPathXmlApplicationContext` exposes a number of constructors to enable convenient instantiation. The basic idea is that you can supply merely a string array that contains only the filenames of the XML files themselves (without the leading path information) and also supplies a `Class`. The `ClassPathXmlApplicationContext` then derives the path information from the supplied class.

```java
ApplicationContext ctx = new ClassPathXmlApplicationContext(
    new String[] {"services.xml", "daos.xml"}, MessengerService.class);
```

#### Wildcards in Application Context Constructor Resource Paths

The resource paths in application context constructor values may be simple paths (as shown earlier), each of which has a one-to-one mapping to a target `Resource` or, alternately, may contain **the special "classpath*:" prefix** or internal **Ant-style regular expressions** (matched by using Spring’s PathMatcher utility). Both of the latter are effectively **wildcards**.

