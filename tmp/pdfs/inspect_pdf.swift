import Foundation
import PDFKit

let path = CommandLine.arguments[1]
guard let doc = PDFDocument(url: URL(fileURLWithPath: path)) else {
  fatalError("Unable to open PDF")
}
print("pages=\(doc.pageCount)")
for i in 0..<doc.pageCount {
  guard let page = doc.page(at: i) else { continue }
  print("--- PAGE \(i + 1) ---")
  print(page.string ?? "")
}
