require 'ra11y'
require 'html-proofer'

task :test do

  # Build site
  sh "bundle exec jekyll build"

  # Test accessibility
  Ra11y::Site.new("./_site").run

  # Test well-formedness
  my_github_urls = Regexp.new 'github.com/fernseed/'
  my_raw_github_urls = Regexp.new 'raw.githubusercontent.com/fernseed/'
  ignored_urls = ["#", my_github_urls, my_raw_github_urls]
  HTMLProofer.check_directory("./_site", only_4xx: true, check_html: true, url_ignore: ignored_urls).run

end
