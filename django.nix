{ pkgs }:

{
  deps = [
    pkgs.python311
    pkgs.python311Packages.django
    pkgs.python311Packages.django-cors-headers
    pkgs.python311Packages.pillow
  ];
}